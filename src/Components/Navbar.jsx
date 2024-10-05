import { useState } from "react";
import { HiArrowSmallRight } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi"; // Hamburger icon for mobile
import { AiOutlineClose } from "react-icons/ai"; // Close icon for mobile
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="absolute top-0 w-full z-50">
      <nav className="max-w-full p-4 flex 
      justify-between items-center text-white overflow-hidden">
        {/* Logo */}
        <div className="text-3xl font-reck 
        lg:text-6xl absolute top-0 right-10 p-10 overflow-hidden">
          OASIS
        </div>

        {/* Vertical Menu for Desktop */}
        <ul className="font-reck hidden md:flex flex-col gap-2 lg:gap-6 
      mx-auto left-96 bottom-52 max-w-5xl absolute top-10 p-10">
          {[
            { name: "Floral", path: "floral" },
            { name: "Cactus", path: "cactus" },
            { name: "Pet Friendly", path: "petFriendly" },
            { name: "Planters", path: "planters" },
            { name: "Misc.", path: "misc" },
          ].map(({ name, path }) => (
            <li key={name} className="nav__item">
              <Link to={`/shop/${path}`} className="flex items-center group">
                <span className="opacity-0 group-hover:opacity-100 
                 ease-in-out mr-2">
                  <HiArrowSmallRight />
                </span>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose size={28} className="z-40 fixed text-zinc-900" />
          ) : (
            <HiMenuAlt3 size={28} />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed z-20 top-0 inset-0 right-0 w-full h-full
             bg-[#F9F9F3] text-zinc-900 p-8 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <ul className="flex flex-col text-center font-reck text-3xl gap-6">
              {[
                { name: "Floral", path: "floral" },
                { name: "Cactus", path: "cactus" },
                { name: "Pet Friendly", path: "petFriendly" },
                { name: "Planters", path: "planters" },
                { name: "Misc.", path: "misc" },
              ].map(({ name, path }) => (
                <li key={name}>
                  <Link to={`/shop/${path}`} onClick={toggleMenu} className="hover:text-gray-600 transition-colors duration-300">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
