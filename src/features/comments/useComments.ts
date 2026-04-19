import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CommentResponse, Page } from "@/lib/types";

export function useComments(challengeId: number | undefined, page = 0, size = 20) {
  return useQuery({
    queryKey: ["comments", challengeId, { page, size }],
    enabled: typeof challengeId === "number",
    queryFn: async () => {
      const { data } = await api.get<Page<CommentResponse>>(
        `/api/challenges/${challengeId}/comments`,
        { params: { page, size } },
      );
      return data;
    },
  });
}

export function useCreateComment(challengeId: number | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: string) => {
      const { data } = await api.post<CommentResponse>(
        `/api/challenges/${challengeId}/comments`,
        { body },
      );
      return data;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["comments", challengeId] }),
  });
}
