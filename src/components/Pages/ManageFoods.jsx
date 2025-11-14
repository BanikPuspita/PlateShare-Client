import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { getMyFoods, deleteFood } from "../../api/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";


const ManageFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyFoods = async () => {
    try {
      const mine = await getMyFoods();
      setFoods(mine);
    } catch {
      toast.error("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFoods();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Food?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
    });
    if (!result.isConfirmed) return;
    try {
      await deleteFood(id);
      toast.success("Deleted!");
      fetchMyFoods();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Loader />;
  if (!foods.length) return <p className="text-center py-20 text-gray-500">No foods added yet.</p>;

  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Manage My Foods</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white rounded-2xl shadow-md p-4 flex gap-4">
            <img src={food.image} alt={food.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{food.name}</h3>
              <p className="text-sm text-gray-600">{food.quantityText}</p>
              <p className="text-sm text-gray-600">Location: {food.pickupLocation}</p>
              <p className="text-xs text-gray-500">
                Exp: {new Date(food.expireDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/update-food/${food._id}`)}
                className="btn btn-primary btn-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(food._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageFoods;