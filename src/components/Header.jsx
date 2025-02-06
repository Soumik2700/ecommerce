import { IoIosArrowDropdown } from "react-icons/io";
import logo from "../assets/Logo.png"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../utils/productStore";
// import "./Header.css";
function Header() {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="w-full bg-slate-300 flex flex-col">
            {/* Top Section */}
            <div className="flex flex-wrap justify-between items-center px-4 py-2 md:px-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img className="w-16 h-16 md:w-20 md:h-20" src={logo} alt="Logo" />
                    <h1 className="font-extrabold text-xl md:text-2xl">Shoppy Globe</h1>
                </div>

                {/* Search Bar */}
                <div className="flex w-full md:w-[50%] items-center gap-3 mt-3 md:mt-0">
                    <input
                        className="border w-full p-2 rounded-lg focus:bg-slate-400"
                        type="text"
                        placeholder="Search products"
                        onChange={(e)=> setSearch(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>dispatch(setSearchQuery(search))}>Search</button>
                </div>

                {/* Cart */}
                <div className="w-12 h-12 md:w-20 md:h-20 flex justify-center items-center mt-3 md:mt-0">
                    <span className="text-xl font-bold">Cart</span>
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
                        <li className="filterNavs cursor-pointer">Smartphones</li>
                        <li className="filterNavs cursor-pointer">Laptops</li>
                        <li className="filterNavs cursor-pointer">Fragrances</li>
                        <li className="filterNavs cursor-pointer">Skincare</li>
                        <li className="filterNavs cursor-pointer">Groceries</li>
                        <li className="filterNavs cursor-pointer">Furniture</li>
                        <li className="filterNavs cursor-pointer">Tops</li>
                        <li className="filterNavs cursor-pointer">Tops</li>
                        <li className="filterNavs cursor-pointer">Tops</li>
                        <li className="filterNavs cursor-pointer">Tops</li>
                        <li className="filterNavs cursor-pointer">Tops</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;