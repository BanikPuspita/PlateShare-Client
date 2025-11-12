import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import { getFoodById } from "../../api/foods";
import { requestFood } from "../../api/requests";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const data = await getFoodById(id);
        setFood(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load food details");
      }
    };
    fetchFood();
  }, [id]);

  const handleRequest = async () => {
    if (!food) return;

    setLoading(true);
    try {
      await requestFood({
        foodId: food._id,
        location: "Your pickup location",
        reason: "I want this food",
        contactNo: "0123456789",
        photoURL: "" 
      });

      toast.success("Food requested successfully!");
      navigate("/my-requests"); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to request food");
    } finally {
      setLoading(false);
    }
  };

  if (!food) return <p>Loading...</p>;

  return (
    <div className="food-details container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">{food.name}</h2>
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <p><strong>Quantity:</strong> {food.quantityText}</p>
      <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
      <p><strong>Expire Date:</strong> {new Date(food.expireDate).toLocaleDateString()}</p>
      <p><strong>Notes:</strong> {food.notes || "No additional notes"}</p>
      <p><strong>Donator:</strong> {food.donator.name}</p>

      <button
        className={`mt-4 px-6 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
        onClick={handleRequest}
        disabled={loading}
      >
        {loading ? "Requesting..." : "Request Food"}
      </button>
    </div>
  );
};

export default FoodDetails;
