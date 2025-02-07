/* eslint-disable react/no-unescaped-entities */
import { IoIosArrowDropdown } from "react-icons/io";
import logo from "../assets/Logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utils/productStore";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

function Header() {
    const [search, setSearch] = useState("");
    const [showCategories, setShowCategories] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);

    // Calculate total quantity
    const cartLength = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="w-full bg-slate-300 flex flex-col">
            {/* Top Section */}
            <div className="flex flex-wrap justify-between items-center px-4 py-2 md:px-10">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <img
                        className="w-16 h-16 md:w-20 md:h-20"
                        src={logo}
                        alt="Logo"
                        onClick={() => {
                            navigate("/");
                            window.location.reload();
                        }}
                    />
                    <h1
                        className="font-extrabold text-xl md:text-2xl"
                        onClick={() => {
                            navigate("/");
                            window.location.reload();
                        }}
                    >
                        Shoppy Globe
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="flex w-full md:w-[50%] items-center gap-3 mt-3 md:mt-0">
                    <input
                        className="border w-full p-2 rounded-lg focus:bg-slate-400"
                        type="text"
                        placeholder="Search products"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            navigate("/");
                            dispatch(setSearchQuery(search));
                        }}
                    >
                        Search
                    </button>
                </div>

                {/* Cart */}
                <div
                    className="cartSection w-12 h-12 md:w-25 md:h-12 flex justify-center items-center mt-1 md:mt-0 gap-1 border rounded-2xl bg-amber-50 border-gray-600 px-2 cursor-pointer"
                    onClick={() => {
                        navigate("cart");
                    }}
                >
                    <span className="text-lg font-bold text-gray-400">Cart</span>
                    <span className="text-lg">
                        <BsCart4 />
                    </span>
                    <p className="numberOfItems">{cartLength}</p>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 md:px-10">
                {/* Categories Dropdown */}
                <div
                    className="w-full md:w-auto flex flex-col relative"
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    <div className="bg-blue-500 px-4 py-2 rounded-2xl flex items-center gap-2 cursor-pointer">
                        <h1 className="font-extrabold text-white">Categories</h1>
                        <IoIosArrowDropdown className="text-white font-extrabold mt-1" />
                    </div>

                    {/* Categories List (Dropdown) */}
                    {showCategories && (
                        <div className="absolute left-0 top-full bg-amber-400 w-48 rounded-lg shadow-lg z-10">
                            <ul className="p-2">
                                <li className="p-2 hover:bg-amber-500 cursor-pointer" onClick={() => {
                                    navigate("/beauty");
                                    dispatch(setSearchQuery("beauty"));
                                }}>Skincare</li>
                                <li className="p-2 hover:bg-amber-500 cursor-pointer" onClick={() => {
                                    navigate("/groceries");
                                    dispatch(setSearchQuery("groceries"));
                                }}>Groceries</li>
                                <li className="p-2 hover:bg-amber-500 cursor-pointer" onClick={() => {
                                    navigate("/furniture");
                                    dispatch(setSearchQuery("furniture"))
                                }}>Furniture</li>
                                <li className="p-2 hover:bg-amber-500 cursor-pointer" onClick={() => {
                                    navigate("/home-decoration")
                                    dispatch(setSearchQuery("/furniture"))
                                }}>Home Decoration</li>

                            </ul>
                        </div>
                    )}
                </div>

                {/* Navigation Links */}
                <div className="w-full md:w-auto flex justify-center">
                    <ul className="flex flex-wrap gap-8 text-sm font-semibold">
                        <li className="filterNavs cursor-pointer remove" onClick={() => { dispatch(setSearchQuery("smartphones")); navigate("/smartphones"); }}>Smartphones</li>
                        <li className="filterNavs cursor-pointer remove" onClick={() => { dispatch(setSearchQuery("laptops")); navigate("/laptops"); }}>Laptops</li>
                        <li className="filterNavs cursor-pointer" onClick={() => { dispatch(setSearchQuery("beauty")); navigate("/beauty"); }}>Skincare</li>
                        <li className="filterNavs cursor-pointer" onClick={() => { dispatch(setSearchQuery("groceries")); navigate("/groceries"); }}>Groceries</li>
                        <Link to={`/furniture`}>
                            <li className="filterNavs cursor-pointer" onClick={() => dispatch(setSearchQuery("furniture"))}>Furniture</li>
                        </Link>
                        <Link to={`/home-decoration`}>
                            <li className="filterNavs cursor-pointer" onClick={() => dispatch(setSearchQuery("home-decoration"))}>Home Decoration</li>
                        </Link>
                        <Link to={`/mens-shirts`}>
                            <li className="filterNavs cursor-pointer remove" onClick={() => dispatch(setSearchQuery("mens-shirts"))}>Men's Shirts</li>
                        </Link>
                        <Link to={`/tops`}>
                            <li className="filterNavs cursor-pointer remove" onClick={() => dispatch(setSearchQuery("tops"))}>Tops</li>
                        </Link>
                        <Link to={`/womens-shoes`}>
                            <li className="filterNavs cursor-pointer remove" onClick={() => dispatch(setSearchQuery("womens-shoes"))}>Women's Shoes</li>
                        </Link>
                        <Link to={`/womens-dresses`}>
                            <li className="filterNavs cursor-pointer remove" onClick={() => dispatch(setSearchQuery("womens-dresses"))}>Women's Dresses</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
