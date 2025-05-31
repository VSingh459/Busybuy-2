import { useSelector } from "react-redux";
import PCard from "./ProductCard.js";
import "./ProductList.css";

function PList() {
  const filteredProducts = useSelector((state) => state.filter.filteredProducts);

  return (
    <div className="pContainer">
      {filteredProducts.map((product) => (
        <PCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.title}
          price={product.price}
          flag={false}
          quantity={1}
        />
      ))}
    </div>
  );
}

export default PList;
