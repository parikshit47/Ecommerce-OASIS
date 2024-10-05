import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const OtherProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce-oasis-sud5.onrender.com/getProducts');
        setProducts(response.data.filter(product => product.category === "newArrivals"));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const nextProducts = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + productsPerView >= products.length) ? 0 : prevIndex + productsPerView
    );
  };

  const prevProducts = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - productsPerView < 0) ? Math.max(products.length - productsPerView, 0) : prevIndex - productsPerView
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-5 mt-10">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / productsPerView)}%` }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product) => (
              <Link 
                key={product._id} 
                to={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`}
                className={`w-1/${productsPerView} flex-shrink-0 px-2`}
              >
                <img src={`/images/${product.image}`} alt={product.name} className="w-full h-64 object-cover" />
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </Link>
            ))}
          </motion.div>
        </div>
        <button
          onClick={prevProducts}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextProducts}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default OtherProducts;