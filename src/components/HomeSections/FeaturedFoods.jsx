import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/foods/featured")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching featured foods:", err));
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Featured Foods
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">
          No featured foods right now.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-base-100 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col overflow-hidden"
              >
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {food.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{food.quantityText}</p>
                  <p className="text-gray-600 text-sm mb-1">📍 {food.pickupLocation}</p>
                  <p className="text-sm text-gray-500">
                    Expire: {new Date(food.expireDate).toLocaleDateString()}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <img
                      src={food.donator?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt={food.donator?.name || "Donator"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700">
                      {food.donator?.name || "Anonymous"}
                    </span>
                  </div>

                  <Link to={`/food/${food._id}`} className="mt-auto">
                    <button className="mt-4 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-all duration-200 w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/available-foods" className="btn btn-primary">
              Show All
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedFoods;
