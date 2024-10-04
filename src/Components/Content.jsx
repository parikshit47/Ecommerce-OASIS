const Content = () => {
  return (
    <div className="w-full bg-[#F9F9F3] text-zinc-900 border-t border-zinc-300 mt-10 p-6 sm:p-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-sm bottom-0">
      {/* Quick Links Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <a href="#about" className="hover:underline transition-colors duration-300">About Us</a>
        <a href="#services" className="hover:underline transition-colors duration-300">Services</a>
        <a href="#contact" className="hover:underline transition-colors duration-300">Contact Us</a>
        <a href="#privacy" className="hover:underline transition-colors duration-300">Privacy Policy</a>
        <a href="#terms" className="hover:underline transition-colors duration-300">Terms of Service</a>
        <a href="#support" className="hover:underline transition-colors duration-300">Support</a>
      </div>

      {/* Customer Care Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold mb-4">Customer Care</h2>
        <a href="#delivery" className="hover:underline transition-colors duration-300">Delivery Information</a>
        <a href="#returns" className="hover:underline transition-colors duration-300">Returns & Exchanges</a>
        <a href="#faq" className="hover:underline transition-colors duration-300">FAQ</a>
        <a href="#size-guide" className="hover:underline transition-colors duration-300">Size Guide</a>
        <a href="#gift-cards" className="hover:underline transition-colors duration-300">Gift Cards</a>
      </div>

      {/* Our Company Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold mb-4">Our Company</h2>
        <a href="#sustainability" className="hover:underline transition-colors duration-300">Sustainability</a>
        <a href="#careers" className="hover:underline transition-colors duration-300">Careers</a>
        <a href="#press" className="hover:underline transition-colors duration-300">Press</a>
        <a href="#affiliates" className="hover:underline transition-colors duration-300">Affiliates</a>
        <a href="#investors" className="hover:underline transition-colors duration-300">Investors</a>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold mb-4">Contact</h2>
        <p className="text-gray-700">Call us: +123 456 7890</p>
        <p className="text-gray-700">Email: info@oasis.com</p>
        <div className="flex gap-4 mt-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-300">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors duration-300">Instagram</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors duration-300">LinkedIn</a>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold mb-4">Stay Connected</h2>
        <p className="text-gray-700 mb-2">Subscribe to our newsletter for exclusive offers and updates.</p>
        <form className="flex flex-col sm:flex-row gap-2">
          <input type="email" placeholder="Enter your email" className="p-2 border border-gray-300 rounded" />
          <button type="submit" className="bg-zinc-800 text-white p-2 rounded hover:bg-zinc-700 transition-colors duration-300">Subscribe</button>
        </form>
      </div>

      {/* Footer Note Section */}
      <div className="col-span-full text-center mt-6 text-sm text-gray-700 border-t border-gray-300 pt-4">
        <p className="text-zinc-900">© 2024 Oasis. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Content;
  