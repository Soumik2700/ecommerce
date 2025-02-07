import { IoIosArrowDropdown } from "react-icons/io";
import logo from "../assets/Logo.png"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utils/productStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
// import "./Header.css";
function Header() {

    const [search, setSearch] = useState("");
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
                    <img className="w-16 h-16 md:w-20 md:h-20" src={logo} alt="Logo" onClick={()=>{
                        navigate("/");
                        // dispatch(setSearchQuery(""));
                        window.location.reload();
                    }}/>
                    <h1 className="font-extrabold text-xl md:text-2xl" onClick={()=>{
                        navigate("/");
                        // dispatch(setSearchQuery(""));
                        window.location.reload();
                    }}>Shoppy Globe</h1>
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
                            navigate("/"); // Ensure navigation occurs
                            dispatch(setSearchQuery(search));
                        }}
                    >
                        Search
                    </button>

                </div>

                {/* Cart */}
                <div className="w-12 h-12 md:w-25 md:h-12 flex justify-center items-center mt-1 md:mt-0 gap-1 border rounded-2xl bg-amber-50 border-gray-600 px-2 cursor-pointer" onClick={()=>{
                    navigate("cart");
                }}>
                    <span className="text-lg font-bold text-gray-400">Cart</span>
                    <span className="text-lg"><BsCart4/></span>
                    <p className="numberOfItems">{cartLength}</p>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 md:px-10">
                {/* Categories Dropdown */}
                <div className="w-full md:w-auto flex justify-center md:justify-start mb-2 md:mb-0">
                    <div className="bg-blue-500 px-4 py-2 rounded-2xl flex items-center gap-2 cursor-pointer">
                        <h1 className="font-extrabold text-white">Categories</h1>
                        <IoIosArrowDropdown className="text-white font-extrabold mt-1" />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="w-full md:w-auto flex justify-center">
                    <ul className="flex flex-wrap gap-8 text-sm md:text-base font-semibold">
                        <li
                            className="filterNavs cursor-pointer"
                            onClick={() => {
                                dispatch(setSearchQuery("smartphones"));
                                navigate("/smartphones");
                            }}
                        >
                            Smartphones
                        </li>
                        <li
                            className="filterNavs cursor-pointer"
                            onClick={() => {
                                dispatch(setSearchQuery("laptops"));
                                navigate("/laptops");
                            }}
                        >
                            Laptops
                        </li>
                        <li
                            className="filterNavs cursor-pointer"
                            onClick={() => {
                                dispatch(setSearchQuery("beauty"));
                                navigate("/beauty");
                            }}
                        >
                            Skincare
                        </li>
                        <li
                            className="filterNavs cursor-pointer"
                            onClick={() => {
                                dispatch(setSearchQuery("groceries"));
                                navigate("/groceries");
                            }}
                        >
                            Groceries
                        </li>
                        <Link to={`/furniture`}>
                            <li className="filterNavs cursor-pointer" onClick={() => {
                                dispatch(setSearchQuery("furniture"));
                                navigate("/furniture")
                            }}>Furniture</li>

                        </Link>

                        <Link to={`/mens-shirts`}>
                            <li className="filterNavs cursor-pointer" onClick={() => dispatch(setSearchQuery("mens-shirts"))}>Mens-shirts</li>

                        </Link>


                        <Link to={`/tops`}><li className="filterNavs cursor-pointer" onClick={()=> dispatch(setSearchQuery("tops"))}>Tops</li></Link>

                        <Link to={`/womens-shoes`}>
                            <li className="filterNavs cursor-pointer" onClick={()=> dispatch(setSearchQuery("womens-shoes"))}>Womens-shoes</li>

                        </Link>
                        <Link to={`/womens-dresses`}>
                            <li className="filterNavs cursor-pointer" onClick={() => dispatch(setSearchQuery("womens-dresses"))}>Womens-dresses</li>

                        </Link>
                        <Link to={`/home-decoration`}>
                            <li className="filterNavs cursor-pointer" onClick={() => dispatch(setSearchQuery("womens-decoration"))}>Home-decoration</li>

                        </Link>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;