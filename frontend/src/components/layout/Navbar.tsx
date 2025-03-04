import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Replace Link with NavLink
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define a common style for active links
  const activeLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "relative text-primary-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-600 after:transition-all after:duration-300"
      : "text-black hover:text-primary-600 transition-colors";

  const authLinks = (
    <>
      <div className="hidden md:flex items-center space-x-16 text-base">
        <p className="text-black font-medium text-lg">
          Welcome,{" "}
          <span className="bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text">
            {user?.name}
          </span>
        </p>
        <div className="flex items-center space-x-4">
          <NavLink to="/dashboard" className={activeLinkStyle}>
            Dashboard
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={activeLinkStyle}>
              Admin
            </NavLink>
          )}
          <button
            onClick={onLogout}
            className="ml-2 inline-flex items-center justify-center rounded-md text-black px-4 py-2 text-sm font-medium shadow-xs hover:bg-red-500 hover:text-white ring-2 ring-red-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 right-0 bg-primary-800 shadow-lg z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="block px-3 py-2 text-white font-medium border-b border-primary-700">
            Welcome, {user?.name}
          </div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-700"
                : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-700"
                  : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}
          <button
            onClick={onLogout}
            className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );

  const guestLinks = (
    <>
      <div className="hidden md:flex items-center space-x-4">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-primary-600 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-600 after:transition-all after:duration-300"
              : "text-white hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-xs relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-600 after:transition-all after:duration-300"
              : "inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-primary-600 shadow-xs hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          }
        >
          Register
        </NavLink>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 right-0 bg-primary-800 shadow-lg z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-700"
                : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-700"
                : "block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-700"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </NavLink>
        </div>
      </div>
    </>
  );

  return (
    <nav className="bg-white/95 shadow-xs fixed top-0 left-0 right-0 z-50">
      <div className="container-custom">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <NavLink to="/" className="text-black font-medium text-2xl">
              Mini Ticket
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation links */}
          {user ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
