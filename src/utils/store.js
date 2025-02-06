import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../utils/productStore"

const store = configureStore({
    reducer: {
        search: searchReducer
    }
});

export default store;