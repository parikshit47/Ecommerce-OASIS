/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HiX, HiMenu } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

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
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.body.style.overflow = 'hidden'; // Disable scrolling
      } else {
        document.body.style.overflow = 'auto'; // Enable scrolling
      }
      return newState;
    });
  };
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isMobileMenuOpen]);
  

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    navigate(`/shop/${category}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const currentCategory = location.pathname.split('/').pop();
    if (currentCategory && currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
    }
  }, [location, selectedCategory, setSelectedCategory]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
      },
    },
  };

  const closeButtonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <header className="w-full z-50 top-0 fixed bg-[#F9F9F3] shadow-md ">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between lg:justify-evenly py-4">
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
          <button className="md:hidden text-zinc-900 z-50" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <motion.div
                initial="closed"
                animate="open"
                variants={closeButtonVariants}
                transition={{ duration: 0.3 }}
              >
                <HiX size={24} />
              </motion.div>
            ) : (
              <HiMenu size={24} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      className="md:hidden fixed top-0 right-0 w-full h-full bg-white z-40 shadow-lg overflow-hidden" // Adjusted styles here
      ref={dropdownRef}
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
    >
      <ul className="p-4 mt-16 h-full">
        {["all", "floral", "cactus", "petFriendly", "planters", "misc"].map((category, index) => (
          <motion.li
            key={category}
            className="py-2"
            variants={menuItemVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ delay: 0.1 * index }}
          >
            <button
              onClick={() => handleCategoryChange(category)}
              className={`block w-full text-left text-2xl px-4
                py-2 uppercase hover:bg-green-100 transition-colors 
                duration-300 rounded-md ${selectedCategory === category ? "bg-green-100 text-green-700" : ""}`}
            >
              {formatCategoryName(category)}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </header>
  );
};

export default ShopHeader;
