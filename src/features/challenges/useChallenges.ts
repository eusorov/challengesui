import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  ChallengeRequest,
  ChallengeResponse,
  Page,
} from "@/lib/types";

export function useChallenges(page = 0, size = 20) {
  return useQuery({
    queryKey: ["challenges", { page, size }],
    queryFn: async () => {
      const { data } = await api.get<Page<ChallengeResponse>>(
        "/api/challenges",
        { params: { page, size } },
      );
      return data;
    },
  });
}

export function useChallenge(id: number | undefined) {
  return useQuery({
    queryKey: ["challenges", id],
    enabled: typeof id === "number" && !Number.isNaN(id),
    queryFn: async () => {
      const { data } = await api.get<ChallengeResponse>(
        `/api/challenges/${id}`,
      );
      return data;
    },
  });
}

export function useCreateChallenge() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ChallengeRequest) => {
      const { data } = await api.post<ChallengeResponse>(
        "/api/challenges",
        payload,
      );
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["challenges"] }),
  });
}
