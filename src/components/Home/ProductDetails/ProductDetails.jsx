import { useNavigate, useParams } from "react-router-dom";
import { useProductById } from "../../../hooks/queries/useProductById";
import { useEffect, useState } from "react";
import { useAddToCart } from "../../../hooks/queries/useAddToCart";
import { useSelector } from "react-redux";
import { useCart } from "../../../hooks/queries/useCart";
import ProductsList from "../ProductsList/ProductsList";
import "./ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, isLoading, isError, error } = useProductById(productId);
  const { mutate } = useAddToCart();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const cartQuery = useCart();
  const quantityInCart = cartQuery.data?.find(
    (cartProduct) => Number(cartProduct.productId) === Number(productId)
  )?.quantity;
  const isInTheCart =
    cartQuery.data?.some((cartProduct) => cartProduct.productId === data?.id) ??
    false;
  const [quantity, setQuantity] = useState(Number(quantityInCart));

  function increment() {
    const newQuantity = quantity + 1;
    const stock = 10;
    if (newQuantity <= stock) setQuantity(newQuantity);
  }

  function decrement() {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  }

  function handleAdd() {
    if (isLogged) mutate({ quantity, productId });
    else navigate("/login");
  }

  useEffect(() => {
    setQuantity(Number(quantityInCart));
  }, [quantityInCart]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message ?? "Couldn't load product"}</p>;

  return (
    <section className="main__cont">
      <section className="p_details_cont">
        <div className="p_img_cont">
          <img src={data.images[0].url} alt={data.title} className="p_img" />
        </div>
        <div className="p_info_cont">
          <h3>{data.brand}</h3>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <div>
            <div className="p_buy_details">
              <h3>Price</h3>
              <p>
                <em>$ {data.price}</em>
              </p>
            </div>
            <div className="p_buy_count">
              <h3>Quantity</h3>
              <div className="counter">
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
              </div>
            </div>
          </div>
          {!isInTheCart && <button onClick={handleAdd}>Add to cart</button>}
          {isInTheCart && <button>Update in the cart</button>}
        </div>
      </section>
      <ProductsList categories={data.categoryId} excludedIds={[data.id]} />
    </section>
  );
};

export default ProductDetails;
