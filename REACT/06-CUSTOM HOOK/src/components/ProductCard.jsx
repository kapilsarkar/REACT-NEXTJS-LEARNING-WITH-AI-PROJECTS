import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-cart">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button onClick={() => onAddToCart(product)}>
        <FaShoppingCart /> Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
