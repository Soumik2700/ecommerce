import { createCartProduct, createProduct, deleteFromCart, fetchAllProducts, fetchProductById, updateCartProduct } from "../Controller/products.coltroller.js";
import { authenticateUser } from "../Controller/user.controller.js";

//Function declaration for routes
export function routes(app) {
    app.post("/product", authenticateUser, createProduct);
    app.get("/products", authenticateUser, fetchAllProducts);
    app.get("/product/:id", authenticateUser, fetchProductById);
    app.post("/cart", authenticateUser, createCartProduct);
    app.put("/cart/:id", authenticateUser, updateCartProduct);
    app.delete("/cart/:id", authenticateUser, deleteFromCart)
}
