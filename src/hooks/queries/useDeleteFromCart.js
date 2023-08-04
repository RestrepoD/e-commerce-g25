import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { deleteFromCart } from "../../services/cart/deleteFromCart";

export function useDeleteFromCart() {
  const token = useSelector((store) => store.auth.token);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (cartProductId) => deleteFromCart(cartProductId, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return mutation;
}
