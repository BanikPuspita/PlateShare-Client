import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { getMyFoods, deleteFood } from "../../api/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

const ManageFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyFoods = async () => {
    try {
      const mine = await getMyFoods();
      setFoods(mine);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFoods();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await deleteFood(id);
      toast.success("Deleted successfully!");
      fetchMyFoods();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete food");
    }
  };

  if (loading) return <Loader></Loader>;

  return (
    <section className="max-w-3xl mx-auto py-32 px-4">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Manage My Foods
      </h2>
      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No foods found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-base-100 border border-gray-100 shadow-md rounded-2xl overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-28 h-20 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {food.name}
                  </h3>
                  <p className="text-sm text-gray-600">Qty: {food.quantityText}</p>
                  <p className="text-sm text-gray-600">
                    Pickup: {food.pickupLocation}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 px-4 pb-4">
                <button
                  className="btn btn-primary flex-1"
                  onClick={() => navigate(`/update-food/${food._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error flex-1"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageFoods;
