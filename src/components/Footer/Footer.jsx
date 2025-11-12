import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../../assets/plate_logo.jpg";
import twitter from "../../assets/twitter.jpg"; 
const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-6 mt-10">
      <div className="footer max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <img src={logo} alt="PlateShare Logo" className="w-10 h-10 object-contain" />
          <div>
            <h2 className="text-xl font-bold text-primary">PlateShare</h2>
            <p className="text-sm">Sharing food, spreading kindness.</p>
          </div>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} PlateShare. All rights reserved.
        </p>

        <div className="flex gap-4 text-2xl mt-4 md:mt-0">
          <Link to="https://facebook.com" target="_blank">
            <FaFacebook />
          </Link>

          <Link to="https://x.com" target="_blank">
            <img src={twitter} alt="X Logo" className="w-8 h-6 object-contain" />
          </Link>

          <Link to="https://instagram.com" target="_blank">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
