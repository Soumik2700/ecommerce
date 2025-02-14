import Product from "../Model/products.model.js";
import Cart from "../Model/cart.model.js";

export function createProduct(req, res) {
    const { name, price, description, stockQuantity } = req.body;

    if (!name || !price || !description || !stockQuantity) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const product = {
        name,
        price,
        description,
        stockQuantity
    }

    const newProduct = new Product(product);

    newProduct.save().then((data) => {
        res.status(201).json({ message: "Data added sucessfully", product: newProduct });
    });
}

export async function fetchAllProducts(req, res) {
    try {
        const allProducts = await Product.find()

        if (!allProducts) {
            return res.send(404).json({
                message: "No products present is database!"
            })
        }

        res.status(200).json({ Products: allProducts });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

export async function fetchProductById(req, res) {
    try {
        const productId = req.params.id;

        const newProduct = await Product.findById(productId);

        if (!newProduct) {
            return res.status(404).json({ message: "No products is found with this id" });
        }

        res.status(200).json({
            message: "Product found!",
            product: newProduct
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error!",
            error: err.message
        })
    }
}

export async function createCartProduct(req, res) {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Both fields are required!"
            })
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "No product found with this productID"
            })
        }

        const newProduct = new Cart({
            productId,
            quantity
        })

        newProduct.save().then((data) => {
            res.status(200).json({
                message: "Product added to the cart!",
                product: data
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

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
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

export async function deleteFromCart(req, res) {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                message: "product id is required!"
            });
        }

        const deletedProduct = await Cart.findOneAndDelete({ productId });

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
        res.status(500).json({
            message: "Internal server error!",
            error: err.message
        })
    }
}
