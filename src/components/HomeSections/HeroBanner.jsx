import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/plate_banner.jpg"; 

const HeroBanner = () => {
  return (
    <section className="relative bg-gray-100">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 text-center md:text-left flex flex-col md:flex-row items-center md:justify-between gap-8">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Share Surplus Food. Spread Kindness.
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            PlateShare connects people in need with donors, reducing food waste
            and helping the community.
          </p>
          <Link
            to="/available-foods"
            className="btn btn-primary btn-lg"
          >
            View All Foods
          </Link>
        </div>

        <div className="hidden md:block w-1/2">
          <img
            src={bannerImg}
            alt="Community Food Sharing"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
