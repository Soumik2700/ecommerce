import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";

function ProductList() {
    const { data } = useFetch("https://dummyjson.com/products");
    // console.log(data);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(4); // Default for larger screens

    // Update products state when data is available
    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
    }, [data]);

    // Adjust productsPerPage based on screen size and handle resizing
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setProductsPerPage(2);  // 2 items per page for small screens
            } else {
                setProductsPerPage(4);  // 4 items per page for medium screens
            }
        };

        // Call handleResize immediately to set the correct products per page
        handleResize();

        // Listen for window resizing
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // console.log(products.length, productsPerPage)

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);
    // console.log("total page", totalPages);

    // Get products for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return (
        <div className="w-full flex flex-col items-center">
            {/* Product List */}
            <div className="w-[95%] border productList p-4" style={{ height: "700px", overflow: "hidden" }}>
                {paginatedProducts.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-4">
                        {paginatedProducts.map((product) => (
                            <Link key={product.id} to={`productDetails/${product.id}`}>
                                <ProductItem key={product.id} product={product} />

                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Loading products...</p>
                )}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
                <div className="flex gap-2 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    <span className="px-4 py-2 bg-gray-100 rounded">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductList;
