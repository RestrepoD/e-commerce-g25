import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/queries/useCart";
import { useAddToCart } from "../../../hooks/queries/useAddToCart";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { mutate } = useAddToCart();
  const { data, isLoading } = useCart();
  const isLogged = useSelector((store) => store.auth.isLogged);
  const navigate = useNavigate();
  let isInTheCart = data?.some(
    (cartProduct) => cartProduct.productId === product.id
  );
  const isAddVisible = !isLogged || !isInTheCart;

  function handleAdd(e) {
    e.preventDefault();
    if (!isLogged) navigate("/login");
    else mutate({ quantity: 1, productId: product.id });
  }

  return (
    <Link to={"/product/" + product.id} className="product_card__link">
      <article className="product_card">
        <header className="product_card__h">
          <div className="product_card__images_cont">
            <img
              src={product.images[0].url}
              alt="1"
              className="product_card__img product_card__shown_img"
            />
            <img
              src={product.images[1].url}
              alt="2"
              className="product_card__img product_card__hidden_img"
            />
          </div>
          <p className="product_card__paragraphs">{product.brand}</p>
          <h2 className="product_card__title">{product.title}</h2>
        </header>
        <div className="product_card__info">
          <section className="product_card__price">
            <h3 className="product_card__title">Price</h3>
            <p className="product_card__paragraphs">${product.price}</p>
          </section>
          {isAddVisible && (
            <button
              onClick={handleAdd}
              disabled={isLoading}
              className="product_card__btn"
            >
              <i className="bx bxs-cart-add"></i>
            </button>
          )}
          {!isAddVisible && (
            <div className="product_card__no_btn">
              <p>In cart</p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
