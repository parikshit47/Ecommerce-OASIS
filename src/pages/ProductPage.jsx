import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import OtherProducts from "../Components/OtherProducts";

const ProductPage = () => {
  const { name } = useParams(); // Get product name from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);
  const dispatch = useDispatch();
  

  // Fetch the product data by name
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch("/products.json");
        const products = await response.json();

        console.log("Fetched Products:", products); // Log fetched products

        const foundProduct = products.find(
          (p) => p.name.toLowerCase() === name.replace(/-/g, " ").toLowerCase()
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setLoading(false); // Set loading to false when the product is found
        } else {
          setError("Product not found");
          setLoading(false); // Set loading to false if there's an error
        }
      } catch (err) {
        console.error("Error fetching product:", err); // Log the error
        setError("Failed to fetch product");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProduct();
  }, [name]);

  // Handle adding the product to cart
  const handleAddToCart = () => {

    console.log("Adding to cart:", {
      id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: localQuantity,
    });

    dispatch(
      addItem({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: localQuantity,
      })
    );
  };

  // Handle increasing and decreasing local quantity
  const increaseQuantity = () => {
    setLocalQuantity((prev) => {
      console.log("Increasing quantity:", prev + 1);
      return prev + 1;
    });
  };

  const decreaseQuantity = () => {
    if (localQuantity > 1) {
      setLocalQuantity((prev) => {
        console.log("Decreasing quantity:", prev - 1);
        return prev - 1;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    ); // Display a loader while product is being fetched
  }

  if (error) {
    return <div className="text-xl text-center text-red-700">{error}</div>;
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row mx-auto max-w-7xl p-2 sm:p-5">
        <div className="w-full lg:w-1/2 lg:p-4">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className={`w-full h-auto max-h-[44rem] object-contain 
              transition-opacity ease-in-out ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />
        </div>

        <motion.div
          className="flex flex-col w-full lg:w-1/2 px-2 sm:px-4 lg:px-8 items-center
           transition-opacity duration-700 ease-in-out mt-4 lg:mt-0 lg:items-start"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-medium mb-2 uppercase">
            {product.name}
          </h1>
          <h2 className="text-lg sm:text-xl mb-4
          pb-4 font-medium ">
            ${product.price}
          </h2>
          <div className="border-b-2 border-gray-300  w-full max-w-lg p-5 mb-2  "></div>
          <p className="text-sm sm:text-base mb-4 max-w-lg p-2">{product.description}</p>

          {/* Local Quantity Controls */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center border border-gray-300">
              <button
                onClick={decreaseQuantity}
                className="px-2 sm:px-3 py-1 sm:py-2 text-lg sm:text-xl font-semibold border-r
                 border-gray-300 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-2 sm:px-3 py-1 sm:py-2 text-sm w-8 sm:w-10
               text-center">
                {localQuantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="px-2 sm:px-3 py-1 sm:py-2 text-lg sm:text-xl font-semibold 
                border-l border-gray-300 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#1E1E1E] text-white px-4 sm:px-8 py-2
             hover:bg-green-600 transition duration-300 uppercase rounded-lg mt-4 w-full sm:w-auto"
          >
            Add to Cart • ${product.price}
          </button>
        </motion.div>
      </section>
      <OtherProducts />
    </>
  );
};

export default ProductPage;
