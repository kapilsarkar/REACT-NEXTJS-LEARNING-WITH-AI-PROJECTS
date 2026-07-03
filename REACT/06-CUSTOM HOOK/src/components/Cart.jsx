import  CartItem  from "./CartItem.jsx";

const Cart = ({ cart, updateQuantity, removeFromCart, total }) => {
  if (cart.length === 0) {
    return <div className="cart empty">Your cart is Empty</div>;
  }
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
      <div className="cart-total">
        <h3>Total : ${typeof total === "string" ? total : total.toFixed(2)}</h3>
        <button className="checkout-btn">Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
