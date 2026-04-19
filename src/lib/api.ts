import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/features/auth/authStore";

// Base URL comes from env; the Vite dev proxy handles `/api` → :8080
// when VITE_API_URL is empty (see vite.config.ts).
const baseURL = import.meta.env.VITE_API_URL || "";

export const api = axios.create({
  baseURL,
  headers: {
    "API-Version": "1",
    "Content-Type": "application/json",
  },
});

// Attach Bearer token on every request when available.
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear the session and bounce to login.
api.interceptors.response.use(
  (r) => r,
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== "undefined" && !location.pathname.startsWith("/login")) {
        location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

/**
 * Helper for endpoints that accept `application/x-www-form-urlencoded`
 * (login, register, forgot/reset password — see openapi.yaml).
 */
export async function postForm<T>(
  url: string,
  data: Record<string, string | number | boolean | undefined>,
  config: AxiosRequestConfig = {},
): Promise<T> {
  const body = new URLSearchParams();
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null) body.append(k, String(v));
  });
  const res = await api.post<T>(url, body, {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data;
}

/** Extract a user-friendly error message from an Axios error. */
export function apiError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as
      | { message?: string; error?: string }
      | undefined;
    return (
      data?.message ||
      data?.error ||
      err.response?.statusText ||
      err.message ||
      "Request failed"
    );
  }
  return "Unexpected error";
}
