
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">RentWheels</h1>
          <p className="text-gray-400 mb-2">Your trusted car rental platform.</p>
          <p className="text-gray-400">support@rentwheels.com</p>
          <p className="text-gray-400">+880 1234 567890</p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="/browse-cars" className="hover:underline">Browse Cars</a>
            </li>
            <li>
              <a href="/add-car" className="hover:underline">Add Car</a>
            </li>
            <li>
              <a href="/my-listings" className="hover:underline">My Listings</a>
            </li>
            <li>
              <a href="/my-bookings" className="hover:underline">My Bookings</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400"><FaSquareXTwitter/></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 RentWheels. All rights reserved. | Terms & Conditions
      </div>
    </footer>
  );
};

export default Footer;
