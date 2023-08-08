import { usePurchases } from "../../hooks/queries/usePurchases";
import PurchasedProduct from "../../components/Home/PurchasedProduct/PurchasedProduct";
import "./Purchases.css";

const Purchases = ({ title, price }) => {
  const { data, isLoading, isError } = usePurchases(title, price);

  if (isLoading) return <p>Loading products...</p>;
  if (!isLoading && isError) return <p>Oops, something went wrong</p>;

  return (
    <div>
      <ul>
        {data
          .filter((product) => product.id)
          .map((product) => (
            <li key={product.id} className="purchase_list__item">
              <PurchasedProduct product={product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Purchases;
