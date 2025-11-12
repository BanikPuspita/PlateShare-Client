// src/components/Pages/ManageFoods.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { getAvailableFoods, deleteFood } from "../../api/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ManageFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  const fetchMyFoods = async () => {
    try {
      const all = await getAvailableFoods();
      const mine = all.filter((f) => f.donator?.email === user.email);
      setFoods(mine);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyFoods();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await deleteFood(id);
      toast.success("Deleted");
      fetchMyFoods();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Manage My Foods</h2>
      {foods.length === 0 ? (
        <p>No foods found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {foods.map((food) => (
            <div key={food._id} className="border p-4 rounded flex flex-col">
              <div className="flex gap-3 items-center">
                <img src={food.image} alt={food.name} className="w-24 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{food.name}</h3>
                  <p className="text-sm">Qty: {food.quantityText}</p>
                  <p className="text-sm">Pickup: {food.pickupLocation}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn btn-sm" onClick={() => navigate(`/update-food/${food._id}`)}>Update</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(food._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
