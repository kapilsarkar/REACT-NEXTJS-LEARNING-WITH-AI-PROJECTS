import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/features/products/productSlice";
import { addToCart } from "../store/features/cart/cartSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-rose-500 py-10 font-semibold">{error}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto dark:text-white">
      {items.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition"
        >
          <div className="h-44 w-full flex items-center justify-center p-2 mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm line-clamp-2">
              {product.title}
            </h3>
            <p className="text-lg font-bold text-slate-900 mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-4 w-full cursor-pointer bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-sm font-medium transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
