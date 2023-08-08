import { useQuery } from "@tanstack/react-query";
import { getAllPurchases } from "../../services/purchases/getAllPurchases";

export function usePurchases(title, price) {
  const query = useQuery({
    queryKey: ["purchases", { title, price }],
    queryFn: () => getAllPurchases(title, price),
  });

  return query;
}
