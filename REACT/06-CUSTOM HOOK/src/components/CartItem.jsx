import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      
        <div className="item-details">
          <h4>{item.name}</h4>
          <p>{item.price}</p>
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <FaMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <FaPlus />
            </button>
          </div>
        </div>
        <button className="remove-btn"><FaTrash onClick={()=> removeFromCart(item.id)}/></button>
      </div>
    
  );
};

export default CartItem;
