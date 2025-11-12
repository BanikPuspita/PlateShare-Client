import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableFoods } from "../../api/foods";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAvailableFoods();
        setFoods(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="available-foods container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Available Foods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{food.name}</h3>
            <p className="text-sm">Quantity: {food.quantityText}</p>
            <p className="text-sm">Pickup: {food.pickupLocation}</p>
            <p className="text-sm">Donator: {food.donator.name}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/food/${food._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
