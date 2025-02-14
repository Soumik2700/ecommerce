import express from "express"
import mongoose from "mongoose"
import { routes } from "./Routes/products.routes.js";
import { userRoutes } from "./Routes/user.routes.js";

//Creating new server
const app = new express();
app.use(express.json()); //middleware for parsing data

//applying user routes
userRoutes(app);

app.listen(5200, () => {
    console.log("server is running on port 5200");
})

//setup mongodb
mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connection is sucessful!");
})

db.on("error", () => {
    console.log("connection is not sucessful!");
})

//applying products and cart routes
routes(app);