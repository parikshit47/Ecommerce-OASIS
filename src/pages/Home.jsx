import { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";

const LazyNewArrivals = lazy(() => import("../Components/NewArrival"));
const LazyCategories = lazy(() => import("../Components/Categories"));
const LazyWork = lazy(() => import("../Components/Work"));
const LazyFAQ = lazy(() => import("../Components/FAQ"));

const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    country: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Helmet>
        <title>Oasis - Home</title>
        <meta name="description" content="Welcome to Oasis - Your one-stop shop for plants and planters" />
      </Helmet>
      <section className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <div className="bg-[#ECEFDF] w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="font-reck text-lg mb-4 text-center lg:text-left">
              Stay in touch with the latest from Oasis
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-grow bg-[#ECEFDF] border-b border-zinc-900 placeholder:text-zinc-900 p-2"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                aria-label="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-grow bg-[#ECEFDF] border-b border-zinc-900 placeholder:text-zinc-900 p-2"
                required
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="flex-grow bg-[#ECEFDF] border-b border-zinc-900 p-2"
                required
              >
                <option value="">Select Country</option>
                <option value="Poland">Poland</option>
                <option value="Singapore">Singapore</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Portugal">Portugal</option>
                <option value="India">India</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Belgium">Belgium</option>
                <option value="Switzerland">Switzerland</option>
              </select>
              <button type="submit" className="bg-[#99A191] text-[#ECEFDF] p-2 font-reck w-full sm:w-auto">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>
          <LazyCategories />
          <LazyNewArrivals />
          <LazyFAQ />
          <LazyWork />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
