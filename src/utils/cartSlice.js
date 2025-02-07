import { createSlice } from "@reduxjs/toolkit";

// Function to get cart data from localStorage
function getDataFromLocalStorage() {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: getDataFromLocalStorage(),
    },
    reducers: {
        setItem: (state, action) => {
            const existingProduct = state.items.find((product) => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            // ✅ Save updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeItem: (state, action) => {
            state.items = state.items
                .map((product) =>
                    product.id === action.payload.id ? { ...product, quantity: product.quantity - 1 } : product
                )
                .filter((product) => product.quantity > 0);

            // ✅ Save updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            // ✅ Remove from localStorage
            localStorage.removeItem("cart");
        },
    },
});

export const { setItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
