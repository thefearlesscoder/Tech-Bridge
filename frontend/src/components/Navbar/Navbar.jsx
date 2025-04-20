import React from "react";

import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../slices/authSlice.js"
import toast from "react-hot-toast";


const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 3,
    name: "Community",
    link: "/community",
  },
  {
    id: 3,
    name: "Wishlist",
    link: '/wishlist'
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Add project",
    link: "/upload-project",
  },
  {
    id: 2,
    name: "My Space",
    link: "/my-space",
  },
  {
    id: 3,
    name: "Add Post",
    link: "/make-post",
  },
];

// ...imports remain unchanged

const Navbar = ({ handleOrderPopup, setSearchQuery }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const token = localStorage.getItem("token");
  console.log(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userinfo");
    dispatch(logout());
    navigate("/signin");
    toast.success("Logged out successfully");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="shadow-md bg-white dark:bg-slate-800 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div>
            <a href="/" className="font-bold text-xl flex gap-1 items-center">
              <FiShoppingBag size="30" />
              Tech Bridge
            </a>
          </div>

          {/* Right section: Search, Collaborate, Theme, Auth */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search by Category or Owner"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                className="w-[200px] sm:w-[250px] group-hover:w-[300px] transition-all duration-300 rounded-lg border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-slate-800"
              />
              <IoMdSearch className="text-slate-800 dark:text-white absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Collaborate Button */}
            <button
              onClick={handleOrderPopup}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-black py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Collaborate
              </span>
              <FaCartShopping className="text-xl text-black drop-shadow-sm cursor-pointer" />
            </button>

            {/* Dark Mode Toggle */}
            <DarkMode />

            {/* Auth Buttons */}
            <div className="flex gap-2">
              {!user ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {/* Always visible */}
          <li>
            <a href="/" className="inline-block px-4 hover:text-primary duration-200">
              Home
            </a>
          </li>
          <li>
            <a href="/community" className="inline-block px-4 hover:text-primary duration-200">
              Community
            </a>
          </li>

          {/* Conditionally show Wishlist and Dropdown */}
          {user && (
            <>
              <li>
                <a href="/wishlist" className="inline-block px-4 hover:text-primary duration-200">
                  Wishlist
                </a>
              </li>
              <li className="group relative cursor-pointer">
                <a href="#" className="flex items-center gap-[2px] py-2">
                  Trending Projects
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                  <ul>
                    {DropdownLinks.map((data) => (
                      <li key={data.id}>
                        <a
                          href={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
