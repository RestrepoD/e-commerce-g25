import { useProducts } from "../../../hooks/queries/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

const ProductsList = ({ categories, title, excludedIds = [] }) => {
  const { data, isLoading, isError } = useProducts(categories, title);

  if (isLoading) return <p>Loading products...</p>;
  if (!isLoading && isError) return <p>Oops, something went wrong</p>;

  return (
    <div className="product_list__cont">
      <ul className="product_list">
        {data
          .filter((product) => !excludedIds.includes(product.id))
          .map((product) => (
            <li key={product.id} className="product_list__item">
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsList;
