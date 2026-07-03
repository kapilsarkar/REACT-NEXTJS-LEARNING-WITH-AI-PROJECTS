import "./App.css";
import { useCart } from "./hooks/useCart.js";
import { products } from "./data/products.js";
import  ProductCard  from "./components/ProductCard.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();
  return (
    <>
      <div className="app">
        <header>
          <h1>Shopping Cart</h1>
        </header>
        <main className="products">
          <section>
            {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
          </section>
          <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} total={total} />
        </main>
      </div>
    </>
  );
}

export default App;
