import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../store/features/cart/cartSlice.js";

export default function Cart({ isOpen, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // 1. Clear cart in Redux store
    dispatch(clearCart());

    // 2. Show the success confirmation screen
    setIsSuccess(true);

    // 3. Automatically reset state and close drawer after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end transition-opacity">
      <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl transition-colors">
        
        {/* Header */}
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Order Placed Successfully!
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Thank you for your purchase. We are preparing your order.
              </p>
            </div>
          ) : (
            /* Items List */
            <div className="overflow-y-auto max-h-[60vh] divide-y divide-slate-100 dark:divide-slate-700 mt-4 pr-1">
              {cartItems.length === 0 ? (
                <p className="text-center text-slate-400 dark:text-slate-500 py-12">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain bg-white p-1 rounded border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm font-bold mt-0.5">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold text-sm cursor-pointer transition"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold text-sm cursor-pointer transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-rose-500 hover:text-rose-700 text-xs ml-2 cursor-pointer font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!isSuccess && cartItems.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Total:
              </span>
              <span className="text-2xl font-bold tabular-nums">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="w-1/3 border border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handleCheckout}
                className="w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer shadow-md"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}