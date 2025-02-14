import { loginUser, registerUser } from "../Controller/user.controller.js";

//Function declaration for user routes 
export function userRoutes(app) {
    app.post("/register", registerUser);
    app.post("/login", loginUser);
}