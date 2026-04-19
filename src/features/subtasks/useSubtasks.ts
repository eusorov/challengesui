import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { SubTaskResponse } from "@/lib/types";

export function useSubtasks(challengeId: number | undefined) {
  return useQuery({
    queryKey: ["subtasks", challengeId],
    enabled: typeof challengeId === "number",
    queryFn: async () => {
      // Returns a JSON array, not a page (see ui-description.md).
      const { data } = await api.get<SubTaskResponse[]>(
        `/api/challenges/${challengeId}/subtasks`,
      );
      return data;
    },
  });
}
