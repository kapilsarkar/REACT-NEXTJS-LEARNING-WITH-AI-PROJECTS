import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button onClick={() => addToCart(product)}>
        <FaShoppingCart /> Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
