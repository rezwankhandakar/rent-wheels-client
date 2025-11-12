



import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold" onClick={closeMenu}>
          RentWheels
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6">
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

        {/* Desktop Profile / Login */}
        <div className="relative hidden md:block">
          {!user ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
            >
              Login
            </Link>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <HiX size={28} className="text-white" />
            ) : (
              <HiMenuAlt3 size={28} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 mt-3 rounded-lg py-4 px-6 space-y-3">
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block font-semibold underline"
                    : "block hover:underline"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/browseCars"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block font-semibold underline"
                    : "block hover:underline"
                }
              >
                Browse Cars
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addCar"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block font-semibold underline"
                    : "block hover:underline"
                }
              >
                Add Car
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myListings"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block font-semibold underline"
                    : "block hover:underline"
                }
              >
                My Listings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myBookings"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "block font-semibold underline"
                    : "block hover:underline"
                }
              >
                My Bookings
              </NavLink>
            </li>
          </ul>

          {/* Mobile Profile / Login */}
          <div className="mt-5 border-t border-gray-700 pt-4">
            {!user ? (
              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-white text-blue-600 px-4 py-2 rounded block text-center hover:bg-gray-100"
              >
                Login
              </Link>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-2 rounded-full overflow-hidden border-2 border-white">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CgProfile size={40} className="mx-auto mt-3" />
                  )}
                </div>
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-300 mb-3">{user.email}</p>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
