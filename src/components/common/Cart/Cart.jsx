import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
import { useCreatePurchase } from "../../../hooks/queries/useCreatePurchase";
import CartProduct from "../CartProduct/CartProduct";
import "./Cart.css";

const Cart = ({ isVisible }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const { data, isLoading, isError, error } = useCart();
  const createPurchaseMutation = useCreatePurchase();

  function reducer(acc, cartProduct) {
    const quantity = Number(cartProduct.quantity);
    const price = Number(cartProduct.product.price);
    return acc + quantity * price;
  }

  const total = data?.reduce(reducer, 0) ?? 0;
  const cartToggle = isVisible
    ? "cart_wrapper"
    : "cart_wrapper cart_wrapper__hidden";

  function handleCheckout() {
    if (isLogged) createPurchaseMutation.mutate();
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message ?? "Couldn't load cart"}</p>;

  return (
    <div className={cartToggle}>
      <aside className="cart">
        <h2>Cart</h2>
        {!data && <p>The cart is empty</p>}
        {Boolean(data.length) && (
          <div className="cart_list_cont">
            <ul className="cart_p_list">
              {data.map((cartProduct) => (
                <li key={cartProduct.id}>
                  <CartProduct cartProduct={cartProduct} />
                </li>
              ))}
            </ul>
            <div className="cart_checkout">
              <b>Total: {total.toFixed(2)}</b>
              <button
                onClick={handleCheckout}
                disabled={createPurchaseMutation.isLoading || isLoading}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Cart;
