import { useState} from "react";
import NewArrivals from "../Components/NewArrival";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Categories from "../Components/Categories";
import Work from "../Components/Work";
import FAQ from "../Components/FAQ";

const Home = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { email, name, country });
  };

  return (
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
              placeholder="Email"
              aria-label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-[#ECEFDF] border-b border-zinc-900 placeholder:text-zinc-900 p-2"
            />
            <input
              type="text"
              placeholder="Name"
              aria-label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow bg-[#ECEFDF] border-b border-zinc-900 placeholder:text-zinc-900 p-2"
            />
            <select
              name="countries"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="flex-grow bg-[#ECEFDF] border-b border-zinc-900 p-2"
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
     
      <Categories />
      <NewArrivals />
      <FAQ />
      <Work />
    </section>
  );
};

export default Home;
