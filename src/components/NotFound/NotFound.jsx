import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen px-4">
      <img
        src="https://i.ibb.co.com/nqVTyrgb/depositphotos-82783074-stock-illustration-404-error-page-not-found.jpg" 
        alt="404 Not Found"
        className="w-80 mb-6"
      />
      <h1 className="text-4xl font-bold text-primary mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="btn btn-primary">Back to Home</button>
      </Link>
    </section>
  );
};

export default NotFound;
