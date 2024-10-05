/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Products = ({ products, selectedCategory }) => {
    const formatCategoryName = (category) => {
        return category
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatProductNameForURL = (name) => {
        return name.toLowerCase().replace(/\s+/g, "-");
    };

    return (
        <>
            <motion.div 
                className="text-center pb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-5xl font-reck uppercase tracking-wider">
                    {selectedCategory ? formatCategoryName(selectedCategory) : "All Products"}
                </h1>
            </motion.div>
            <div className="max-w-7xl p-5 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <motion.div
                        key={product._id} // Use product._id as the key
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link 
                            to={{
                              pathname: `/products/${formatProductNameForURL(product.name)}`,
                              state: { product }
                            }}
                            className="group bg-transparent  overflow-hidden 
                            flex flex-col h-full transition-all duration-300 rounded-md"
                        >
                            <div className="relative">
                                <img 
                                    src={`/images/${product.image}`} 
                                    alt={product.name} 
                                    className="w-full h-96 object-cover object-center 
                                    transition-transform duration-300 hover:scale-105"
                                />
                                <div className=" 
                                group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-4 flex-grow flex flex-col
                            justify-between">
                                <h2 className="text-md
                                uppercase  text-gray-800">{product.name}</h2>
                                <p className="text-md  text-gray-900">${product.price}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default Products;
