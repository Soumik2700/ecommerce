import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../utils/productStore";
import cartReducer from "../utils/cartSlice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        cart: cartReducer, // ✅ "cart" instead of "product"
    },
});

export default store;
