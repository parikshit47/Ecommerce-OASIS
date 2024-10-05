/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Cart from './Components/Cart';
import ShopHeader from './Components/ShopHeader';
import CheckOut from './pages/CheckOut';
import { useState, useEffect } from 'react';
import Footer from './Components/Footer';


// New component to handle ShopHeader rendering
const ConditionalShopHeader = ({ selectedCategory, setSelectedCategory }) => {
  const location = useLocation(); // useLocation inside Router context

  // Conditionally render ShopHeader based on the current route
  const showShopHeader = location.pathname !== '/' && location.pathname !== '/home';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Effect runs every time the route changes


  return showShopHeader ? (
    <ShopHeader selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  ) : null;
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <Router basename="/Ecommerce-OASIS">
      {/* Use the new ConditionalShopHeader component */}
      <ConditionalShopHeader selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:category' element={<Shop />} /> 
        <Route path='/products/:name' element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} /> 
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
