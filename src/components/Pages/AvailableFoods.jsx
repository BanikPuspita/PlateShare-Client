import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { requestFood } from "../../api/requests";
import { toast } from "react-hot-toast";

const AvailableFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [requestData, setRequestData] = useState({
    location: "",
    reason: "",
    contactNo: "",
  });
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods");
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const openModal = (food) => {
    setSelectedFood(food);
    setShowModal(true);
    setRequestData({ location: "", reason: "", contactNo: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequest = async () => {
    if (!requestData.location || !requestData.reason || !requestData.contactNo) {
      toast.error("Please fill all fields");
      return;
    }

    setRequestLoading(true);
    try {
      await requestFood({
        foodId: selectedFood._id,
        location: requestData.location,
        reason: requestData.reason,
        contactNo: requestData.contactNo,
        photoURL: user.photoURL || "",
      });
      toast.success("Food requested successfully!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to request food");
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (!foods.length) return <p className="text-center py-20 text-gray-500">No food available right now.</p>;

  return (
    <section className="max-w-[1200px] mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
        Available Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food) => {
          const isOwner = user?.email === food.donator?.email;
          return (
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
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{food.name}</h3>
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
                  <span className="text-sm text-gray-700">{food.donator?.name || "Anonymous"}</span>
                </div>

                {!isOwner && food.food_status === "Available" && (
                  <button
                    className="mt-auto bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-all duration-200 w-full"
                    onClick={() => openModal(food)}
                  >
                    Request Food
                  </button>
                )}

                {isOwner && <p className="mt-auto text-gray-500 text-sm text-center">You own this food</p>}
                {food.food_status === "donated" && <p className="mt-2 text-red-500 text-center font-semibold">Already donated</p>}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">
            <button className="absolute top-3 right-3 font-bold text-gray-500" onClick={() => setShowModal(false)}>
              X
            </button>
            <h3 className="text-xl font-semibold text-primary mb-4">Request This Food</h3>
            <div className="grid gap-3">
              <input
                name="location"
                value={requestData.location}
                onChange={handleChange}
                placeholder="Your pickup location"
                className="input input-bordered w-full"
              />
              <textarea
                name="reason"
                value={requestData.reason}
                onChange={handleChange}
                placeholder="Reason for request"
                className="textarea textarea-bordered w-full"
              />
              <input
                name="contactNo"
                value={requestData.contactNo}
                onChange={handleChange}
                placeholder="Contact number"
                className="input input-bordered w-full"
              />
              <button
                className={`btn w-full ${requestLoading ? "bg-gray-400 cursor-not-allowed" : "btn-success text-white"}`}
                onClick={handleRequest}
                disabled={requestLoading}
              >
                {requestLoading ? "Requesting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AvailableFoods;
