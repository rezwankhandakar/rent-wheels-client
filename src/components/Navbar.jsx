


import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          RentWheels
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browseCars"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Browse Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addCar"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              Add Car
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myListings"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              My Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myBookings"
              className={({ isActive }) =>
                isActive ? "underline font-semibold" : "hover:underline"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </ul>

        {/* Login / Profile */}
        <div className="relative">
          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              
            </div>
          ) : (
            <div>
              <div
                className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center bg-white text-blue-600"
                onClick={toggleDropdown}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <CgProfile size={24} />
                )}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded w-56 py-2">
                  <p className="px-4 py-1 font-semibold">{user.displayName}</p>
                  <p className="px-4 py-1 text-sm text-gray-600">{user.email}</p>
                  <hr className="my-1" />
                  <button
                    onClick={logout}
                    className="px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

