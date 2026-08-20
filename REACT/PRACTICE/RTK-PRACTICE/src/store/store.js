import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../store/features/counter/counterSlice.js";
import themeReducer from "../store/features/theme/themeSlice.js";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer,
    }
})

export default store