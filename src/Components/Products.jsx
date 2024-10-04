/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

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
            <div className="text-center pb-6">
                <h1 className="text-4xl font-reck uppercase">
                    {selectedCategory ? formatCategoryName(selectedCategory) : "All"}
                </h1>
            </div>
            <div className="max-w-6xl p-5 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <Link 
                        to={{
                          pathname: `/products/${formatProductNameForURL(product.name)}`,
                          state: { product } // Pass the product data here
                        }}
                        key={product._id} 
                        className="bg-transparent flex
                         flex-col items-center cursor-pointer item"
                    >
                        <img 
                            src={`/images/${product.image}`} 
                            alt={product.name} 
                            className="w-full md:h-full
                             object-cover mb-4 hover:shadow-md hover:scale-105 transition ease-in-out duration-700"
                        />
                        <p className="text-sm uppercase p-1 px-3 text-center">{product.name}</p>
                        <p className="text-sm p-1">${product.price}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Products;
