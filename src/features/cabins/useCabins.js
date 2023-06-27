import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const cabins = data?.slice().sort((a, b) => a.name - b.name);

  return { isLoading, cabins, error };
}
