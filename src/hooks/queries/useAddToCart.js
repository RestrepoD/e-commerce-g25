import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { addToCart } from "../../services/cart/addToCart";

export function useAddToCart() {
  const token = useSelector((store) => store.auth.token);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ quantity, productId }) =>
      addToCart({ token, quantity, productId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return mutation;
}
