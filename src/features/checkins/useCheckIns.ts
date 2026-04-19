import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  CheckInRequest,
  CheckInResponse,
  Page,
} from "@/lib/types";

export function useCheckIns(challengeId: number | undefined, page = 0, size = 20) {
  return useQuery({
    queryKey: ["checkIns", challengeId, { page, size }],
    enabled: typeof challengeId === "number",
    queryFn: async () => {
      const { data } = await api.get<Page<CheckInResponse>>(
        `/api/challenges/${challengeId}/check-ins`,
        { params: { page, size } },
      );
      return data;
    },
  });
}

export function useCreateCheckIn(challengeId: number | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CheckInRequest) => {
      const { data } = await api.post<CheckInResponse>(
        "/api/check-ins",
        payload,
      );
      return data;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["checkIns", challengeId] }),
  });
}
