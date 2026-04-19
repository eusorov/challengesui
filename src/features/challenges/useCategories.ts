import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

/** GET /api/categories — list of allowed challenge category names. */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<string[]>("/api/categories");
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60_000,
  });
}
