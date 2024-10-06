import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../Components/Products";
import { Helmet } from "react-helmet";

const Shop = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [products, setProducts] = useState([]);

  const formatCategoryName = (category) => {
    return category
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const response = await fetch('/products.json');
      const data = await response.json();
      console.log('Products fetched:', data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const filteredProducts = products.filter(product => 
    selectedCategory === "all" || product.categories.map(cat => cat.toLowerCase()).includes(selectedCategory.toLowerCase())
  );

  return (
    <div className="pt-24">
        <Helmet>
        <title>Oasis - Shop</title>
        <meta name="description" content="Welcome to Oasis - Your one-stop shop for plants and planters" />
      </Helmet>
      <Products 
        products={filteredProducts} 
        selectedCategory={formatCategoryName(selectedCategory)} 
      />
    </div>
  );
};

export default Shop;
