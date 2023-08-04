import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/products/getProductById";

export function useProductById(productId) {
  const query = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });

  return query;
}
