import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, postForm } from "@/lib/api";
import type {
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from "@/lib/types";
import { useAuthStore } from "./authStore";

// The API docs describe /api/login as accepting JSON, form, or multipart.
// The shape of the successful response is loosely `object` in the OpenAPI
// spec; most Spring auth starters return `{ token, user? }` or similar.
// We defensively read the first token-ish field we find.
function extractToken(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  for (const key of ["token", "accessToken", "access_token", "jwt", "id_token"]) {
    const v = d[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  // Nested { data: { token } }
  if (d.data && typeof d.data === "object") return extractToken(d.data);
  return null;
}

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const { data } = await api.post("/api/login", payload);
      return data as unknown;
    },
    onSuccess: (data) => {
      const token = extractToken(data);
      if (!token) {
        throw new Error(
          "Login succeeded but no token was returned. Check the backend response shape.",
        );
      }
      setSession(token, null);
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      // Controller expects form-urlencoded / multipart (not JSON).
      return postForm<unknown>("/api/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      });
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/api/logout");
      } catch {
        // Ignore — we clear locally either way.
      }
    },
    onSettled: () => {
      logout();
      qc.clear();
    },
  });
}

/** Fetch the current user, only when we have a token. */
export function useCurrentUser() {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ["me"],
    enabled: Boolean(token),
    queryFn: async () => {
      const { data } = await api.get<UserResponse>("/api/user");
      return data;
    },
  });
}
