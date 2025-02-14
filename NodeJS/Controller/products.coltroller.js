import Product from "../Model/products.model.js";
import Cart from "../Model/cart.model.js";

// Function declaration for new product
export function createProduct(req, res) {
    const { name, price, description, stockQuantity } = req.body;

    //Validation of fields
    if (!name || !price || !description || !stockQuantity) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const product = {
        name,
        price,
        description,
        stockQuantity
    }

    //Create new product to the Database
    const newProduct = new Product(product);

    newProduct.save().then((data) => {
        res.status(201).json({ message: "Data added sucessfully", product: newProduct });
    });
}

//Function declaration for fetch all products
export async function fetchAllProducts(req, res) {
    try {
        //find all products
        const allProducts = await Product.find()

        //Validation of there is not product found in the database
        if (!allProducts) {
            return res.send(404).json({
                message: "No products present is database!"
            })
        }

        res.status(200).json({ Products: allProducts });
    } catch (err) {

        //Error handeling
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

// Functiom declairation for fetch products by id 
export async function fetchProductById(req, res) {
    try {
        const productId = req.params.id;

        // Find product by id
        const newProduct = await Product.findById(productId);

        //Validation of there is no product found
        if (!newProduct) {
            return res.status(404).json({ message: "No products is found with this id" });
        }

        res.status(200).json({
            message: "Product found!",
            product: newProduct
        })
    } catch (err) {
        //Error Handeling
        res.status(500).json({
            message: "Internal server error!",
            error: err.message
        })
    }
}

//Function declaration for adding product to the cart
export async function createCartProduct(req, res) {
    try {
        const { productId, quantity } = req.body;

        //Validation of fields
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Both fields are required!"
            })
        }

        //Find product by id
        const product = await Product.findById(productId);

        //Product validation
        if (!product) {
            return res.status(404).json({
                message: "No product found with this productID"
            })
        }

        //Making new product for cart with the productId and the quantity
        const newProduct = new Cart({
            productId,
            quantity
        })

        //Saving the productin database
        newProduct.save().then((data) => {
            res.status(200).json({
                message: "Product added to the cart!",
                product: data
            })
        })

    } catch (err) {
        //Error handeling
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

//Funtion declaration for updating the cart product
export async function updateCartProduct(req, res) {
    try {
        const { id: productId } = req.params; // Get productId from URL params
        const { quantity } = req.body; // Get quantity from request body

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Both productId and quantity are required!"
            });
        }

        // Find the cart item by productId and update the quantity
        const updatedCartItem = await Cart.findOneAndUpdate(
            { productId }, // Search by productId in cart
            { quantity },  // Update quantity
            { new: true }  // Return updated document
        );

        //Validation
        if (!updatedCartItem) {
            return res.status(404).json({
                message: "No product available in the cart with the given productId!"
            });
        }

        res.status(200).json({
            message: "Cart updated successfully!",
            updatedCartItem
        });

    } catch (err) {

        //Error handeling
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

//Funtion declaration for delete product from cart
export async function deleteFromCart(req, res) {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                message: "product id is required!"
            });
        }

        //Delete product from databae by productId
        const deletedProduct = await Cart.findOneAndDelete({ productId });

        //Validation
        if (!deletedProduct) {
            return res.status(404).json({
                message: "No product is found with this productId",
            });
        }

        res.status(200).json({
            message: "Product deleted sucessfully!",
            deletedProduct
        })
    } catch (err) {

        //Error handeling
        res.status(500).json({
            message: "Internal server error!",
            error: err.message
        })
    }
}
