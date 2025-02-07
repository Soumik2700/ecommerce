import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function Error() {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            {/* Error Illustration */}
            <img
                src="https://i.imgur.com/qIufhof.png"
                alt="Error Illustration"
                className="w-64 h-64 mb-6"
            />

            {/* Error Message */}
            <h1 className="text-4xl font-bold text-red-600">Oops! Page Not Found</h1>
            <p className="text-lg text-gray-600 mt-2">
               {error?.status} {error?.statusText || error?.message || "An unexpected error has occurred."}
            </p>

            {/* Go Home Button */}
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default Error;
