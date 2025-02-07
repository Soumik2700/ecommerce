import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ProductList() {
    const { data } = useFetch("https://dummyjson.com/products");
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(4);
    const searchQuery = useSelector((state) => state.search);
    const [hasProduct, setHasProduct] = useState(false);

    // Update products state when data is available
    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
    }, [data]);

    // Filter products based on search query
    useEffect(() => {
        if (data && data.products) {
            const filtered = data.products.filter((product) => {
                const title = product.title ? product.title.toLowerCase() : "";
                const category = product.category ? product.category.toLowerCase() : "";
                const brand = product.brand ? product.brand.toLowerCase() : "";
                const query = searchQuery.toLowerCase();

                return title.includes(query) || category.includes(query) || brand.includes(query);
            });
            setProducts(filtered);
            setCurrentPage(1); // Reset to first page when search changes
            setHasProduct(true);
        }
    }, [searchQuery, data]);

    // Adjust productsPerPage based on screen size
    useEffect(() => {
        const handleResize = () => {
            setProductsPerPage(window.innerWidth <= 1024 ? 2 : 4);
        };
        // handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(products.length / productsPerPage);
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
                            <Link key={product.id} to={`/productDetails/${product.id}`}>
                                <ProductItem key={product.id} product={product} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-red-500 font-semibold text-lg">
                        {hasProduct ? "Sorry, no products found!" : "Loading products..."}
                    </p>
                )}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && paginatedProducts.length > 0 && (
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
