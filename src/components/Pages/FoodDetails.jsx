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

  if (!food)
    return (
      <p className="text-center py-20 text-gray-500 text-lg">Loading...</p>
    );

  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <div className="bg-base-100 shadow-md rounded-2xl overflow-hidden border border-gray-100">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">
            {food.name}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Quantity:</strong> {food.quantityText}
            </p>
            <p>
              <strong>Pickup Location:</strong> {food.pickupLocation}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              {new Date(food.expireDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Notes:</strong> {food.notes || "No additional notes"}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <img
                src={
                  food.donator?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={food.donator?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>
                <strong>Donator:</strong> {food.donator.name}
              </p>
            </div>
          </div>

          {food.donator.email !== user.email ? (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Request This Food
              </h3>
              <div className="grid gap-3">
                <input
                  type="text"
                  name="location"
                  value={requestData.location}
                  onChange={handleChange}
                  placeholder="Your pickup location"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="reason"
                  value={requestData.reason}
                  onChange={handleChange}
                  placeholder="Reason for request"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="contactNo"
                  value={requestData.contactNo}
                  onChange={handleChange}
                  placeholder="Contact number"
                  className="input input-bordered w-full"
                  required
                />
                <button
                  onClick={handleRequest}
                  disabled={loading}
                  className={`btn w-full ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "btn-success text-white"
                  }`}
                >
                  {loading ? "Requesting..." : "Request Food"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-red-500 font-semibold mt-4 text-center">
              You cannot request your own food.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
