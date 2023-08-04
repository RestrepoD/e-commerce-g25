import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateCart } from "../../../hooks/queries/useUpdateCart";
import { useDeleteFromCart } from "../../../hooks/queries/useDeleteFromCart";
import "./CartProduct.css";

const CartProduct = ({ cartProduct }) => {
  const initialQuantity = Number(cartProduct.quantity);
  const price = Number(cartProduct.product.price);
  const [quantity, setQuantity] = useState(initialQuantity);
  const { mutate, isLoading } = useUpdateCart();
  const deleteMutation = useDeleteFromCart();
  const isLogged = useSelector((store) => store.auth.isLogged);

  const increment = () => {
    const newQuantity = quantity + 1;
    const stock = 10;
    if (newQuantity <= stock) setQuantity(newQuantity);
  };

  const decrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  function handleUpdate() {
    if (isLogged) {
      mutate({ cartProductId: cartProduct.id, newQuantity: quantity });
    }
  }

  function handleDelete() {
    if (isLogged) deleteMutation.mutate(cartProduct.id);
  }

  return (
    <article className="cart_p_cont">
      <div className="cart_p_img">
        <img
          src={cartProduct.product.images[0].url}
          alt={cartProduct.product.title}
        />
      </div>
      <div className="cart_p_info">
        <header className="cart_p_header">
          <h4>{cartProduct.product.title}</h4>
          <button onClick={handleDelete} disabled={deleteMutation.isLoading}>
            <i className="bx bx-trash"></i>
          </button>
        </header>
        <div className="cart_p_quantity">
          <div className="cart_p_controls">
            <button onClick={decrement} className="cart_p_btn">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={increment} className="cart_p_btn">
              +
            </button>
          </div>
          <div className="cart_p_price">
            <h5>Total</h5>
            <p>{(initialQuantity * price).toFixed(2)}</p>
          </div>
        </div>
        {initialQuantity != quantity && (
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="cart_p_btn"
          >
            Update cart
          </button>
        )}
      </div>
    </article>
  );
};

export default CartProduct;
