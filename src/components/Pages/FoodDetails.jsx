import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getFoodById } from "../../api/foods";
import { requestFood } from "../../api/requests";
import { useAuth } from "../../providers/AuthProvider";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    location: "",
    reason: "",
    contactNo: "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

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
  }, [id, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequest = async () => {
    if (!requestData.location || !requestData.reason || !requestData.contactNo) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await requestFood({
        foodId: food._id,
        location: requestData.location,
        reason: requestData.reason,
        contactNo: requestData.contactNo,
        photoURL: user.photoURL || "",
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
    <div className="container mx-auto my-8 max-w-xl">
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
      <p className="mb-4"><strong>Donator:</strong> {food.donator.name}</p>

      {food.donator.email !== user.email && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Request This Food</h3>
          <div className="grid gap-3 mb-4">
            <input
              type="text"
              name="location"
              value={requestData.location}
              onChange={handleChange}
              placeholder="Your pickup location"
              className="input"
              required
            />
            <input
              type="text"
              name="reason"
              value={requestData.reason}
              onChange={handleChange}
              placeholder="Reason for request"
              className="input"
              required
            />
            <input
              type="text"
              name="contactNo"
              value={requestData.contactNo}
              onChange={handleChange}
              placeholder="Contact number"
              className="input"
              required
            />
            <button
              className={`px-6 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
              onClick={handleRequest}
              disabled={loading}
            >
              {loading ? "Requesting..." : "Request Food"}
            </button>
          </div>
        </div>
      )}

      {food.donator.email === user.email && (
        <p className="text-red-500 font-semibold mt-4">
          You cannot request your own food.
        </p>
      )}
    </div>
  );
};

export default FoodDetails;
