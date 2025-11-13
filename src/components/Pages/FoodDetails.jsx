import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const API_BASE = "https://plate-share-server-chi.vercel.app";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/foods/${id}`);
        const data = await res.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch food details");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!food) return <p className="text-center py-20">Food not found.</p>;

  return (
    <section className="max-w-[800px] mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-primary mb-6">{food.name}</h2>
      <img src={food.image} alt={food.name} className="w-full h-80 object-cover rounded-2xl mb-6" />
      <p className="text-gray-700 mb-2">{food.quantityText}</p>
      <p className="text-gray-700 mb-2">📍 {food.pickupLocation}</p>
      <p className="text-gray-500 mb-4">Expire: {new Date(food.expireDate).toLocaleDateString()}</p>
      <div className="flex items-center gap-2 mb-4">
        <img src={food.donator?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt={food.donator?.name} className="w-10 h-10 rounded-full" />
        <span>{food.donator?.name || "Anonymous"}</span>
      </div>
      <p className="text-gray-600">{food.description || "No description provided."}</p>
    </section>
  );
};

export default FoodDetails;
