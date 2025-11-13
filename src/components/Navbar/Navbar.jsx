import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import logo from "../../assets/plate_logo.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md transition-all duration-200 focus:outline-none focus:bg-transparent active:bg-transparent 
    ${
      isActive
        ? "text-primary font-semibold border-b-2 border-primary"
        : "text-gray-700 hover:text-primary"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-foods" className={navLinkClass}>
          Available Foods
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-food" className={navLinkClass}>
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-foods" className={navLinkClass}>
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-requests" className={navLinkClass}>
              My Food Requests
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10 sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <img src={logo} alt="PlateShare Logo" className="w-10 h-10 object-contain" />
          <span>PlateShare</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2 bg-transparent">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost focus:bg-transparent active:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box mt-3 w-52 p-2 shadow"
          >
            {navLinks}
            {user ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar focus:bg-transparent active:bg-transparent"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 bg-white rounded-box shadow"
            >
              <li>
                <span className="px-3 py-2">{user.displayName || "User"}</span>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
