import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { useDispatch } from "react-redux";
import { setItem } from "../utils/cartSlice";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ Added navigation
    const { data, error, loading } = useFetch(`https://dummyjson.com/products/${id}`);
    const dispatch = useDispatch();

    if (loading) return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500 font-semibold">Error loading product.</div>;

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center mt-5">
            <div className="w-[80%] flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-5">
                <div className="w-full md:w-1/2 flex justify-center items-center p-5">
                    <img
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full max-w-[400px] h-auto rounded-lg shadow-md"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center p-5">
                    <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
                    <p className="text-gray-600 text-lg mb-3">{data.description}</p>
                    <div className="text-xl font-semibold text-green-600 mb-2">${data.price}</div>
                    <div className="text-yellow-500 text-lg font-medium mb-2">⭐ {data.rating} / 5</div>

                    <button
                        className="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        onClick={() => {
                            dispatch(setItem(data));
                            // navigate("/cart"); // ✅ Navigate to cart after adding
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
