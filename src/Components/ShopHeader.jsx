/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Import icons for menu toggle

const formatCategoryName = (category) => {
  return category
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const ShopHeader = ({ selectedCategory, setSelectedCategory }) => {
  const cartItems = useSelector((state) => state.cart);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsMobileMenuOpen(false);
    navigate(`/shop/${category}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full z-50 top-0 sticky bg-[#F9F9F3] shadow-md">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between py-4">
          <Link to="/home" className="text-2xl font-reck text-zinc-900 hover:text-green-700 transition-colors duration-300">
            OASIS
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-1 text-zinc-900 text-sm font-semibold font-smono bg-white rounded-full px-4 py-2 shadow-sm">
            {["all", "floral", "cactus", "petFriendly", "planters", "misc"].map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`uppercase hover:text-green-600 transition-colors duration-300 px-3 py-1 rounded-full ${selectedCategory === category ? "bg-green-100 text-green-700" : ""}`}
                >
                  {formatCategoryName(category)}
                </button>
              </li>
            ))}
          </ul>

          <Link to="/cart" className="flex items-center text-zinc-900 hover:text-green-700 transition-colors duration-300">
            <span className="mr-2 text-sm font-semibold font-smono uppercase">Cart</span>
            <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{totalItems}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-zinc-900" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden" ref={dropdownRef}>
            <ul className="bg-white py-2 rounded-lg shadow-md">
              {["all", "floral", "cactus", "petFriendly", "planters", "misc"].map((category) => (
                <li key={category} className="py-1">
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-4 py-2 uppercase hover:bg-green-100 transition-colors duration-300 rounded-md ${selectedCategory === category ? "bg-green-100 text-green-700" : ""}`}
                  >
                    {formatCategoryName(category)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default ShopHeader;
