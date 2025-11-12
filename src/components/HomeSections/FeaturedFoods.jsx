import React, { useEffect, useState } from "react";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/foods/featured")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching featured foods:", err));
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Foods</h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No featured foods right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-3">{food.name}</h3>
              <p className="text-gray-600">{food.quantityText}</p>
              <p className="text-gray-600">📍 {food.pickupLocation}</p>
              <p className="text-sm text-gray-500">
                Expire: {new Date(food.expireDate).toLocaleDateString()}
              </p>

              {/* ✅ Donator Info */}
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={
                    food.donator?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={food.donator?.name || "Donator"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-700">
                  {food.donator?.name || "Anonymous"}
                </span>
              </div>

              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedFoods;
