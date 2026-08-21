import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/features/counter/counterSlice.js";
import themeReducer from "../store/features/theme/themeSlice.js";
import productReducer from "./features/products/productSlice.js";
import cartReducer from "./features/cart/cartSlice.js";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer,
        products: productReducer,
        cart: cartReducer,
    }
})

export default store