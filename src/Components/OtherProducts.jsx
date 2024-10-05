import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const OtherProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerView, setProductsPerView] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data.filter(product => product.categories.includes("newArrivals")));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerView(1);
      } else if (window.innerWidth < 1024) {
        setProductsPerView(3);
      } else {
        setProductsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProducts = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= products.length ? 0 : nextIndex;
    });
  };

  const prevProducts = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? products.length - 1 : nextIndex;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">New Arrivals</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevProducts}
            className="bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextProducts}
            className="bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / productsPerView)}%` }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product) => (
            <Link 
              key={product._id} 
              to={`/products/${product.name.toLowerCase().replace(/ /g, '-')}`}
              className={`w-full sm:w-1/3 lg:w-1/${productsPerView} flex-shrink-0 px-1.5`}
            >
              <div className="w-full aspect-[3/4] mb-1.5 overflow-hidden rounded-md shadow-sm">
                <img 
                  src={`/images/${product.image}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="mt-1.5 text-xs font-semibold">{product.name}</h3>
              <p className="text-xs text-gray-600">${product.price}</p>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OtherProducts;