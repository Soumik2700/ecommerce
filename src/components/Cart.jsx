import { useSelector, useDispatch } from "react-redux";
import { setItem, removeItem } from "../utils/cartSlice";

function Cart() {
    const cartProducts = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-5">
            <h1 className="text-2xl font-bold mb-5">Your Cart</h1>

            {cartProducts.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className="w-full max-w-2xl">
                    {cartProducts.map((product) => (
                        <li key={product.id} className="border p-4 mb-2 rounded shadow flex justify-between items-center">
                            {/* Product Info */}
                            <div>
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-600">Price: ${product.price}</p>
                                <p className="text-gray-600">Quantity: {product.quantity}</p>
                            </div>

                            {/* Quantity Control */}
                            <div className="flex items-center gap-3">
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    onClick={() => dispatch(removeItem(product))}
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold">{product.quantity}</span>
                                <button
                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                    onClick={() => dispatch(setItem(product))}
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
