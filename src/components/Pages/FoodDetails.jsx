import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodById, getRequestsForFood, updateRequestStatus } from "../../api";
import { useAuth } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ location: "", reason: "", contactNo: "" });

  const isOwner = food?.donator?.email === user?.email;

  useEffect(() => {
    const load = async () => {
      try {
        const [f, reqs] = await Promise.all([
          getFoodById(id),
          isOwner ? getRequestsForFood(id) : Promise.resolve([])
        ]);
        setFood(f);
        setRequests(reqs);
      } catch (err) {
        toast.error("Failed to load food");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isOwner]);

  const handleRequest = async () => {
    if (!form.location || !form.contactNo) return toast.error("Fill required fields");
    try {
      await requestFood({
        foodId: id,
        ...form,
        photoURL: user.photoURL
      });
      toast.success("Request sent!");
      setShowModal(false);
    } catch {
      toast.error("Request failed");
    }
  };

  const handleStatus = async (reqId, status) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Mark as ${status}?`,
      icon: "warning",
      showCancelButton: true,
    });
    if (!result.isConfirmed) return;
    try {
      await updateRequestStatus(reqId, status);
      toast.success(`Request ${status}!`);
      setRequests(prev => prev.map(r => r._id === reqId ? { ...r, status } : r));
      if (status === "accepted") {
        setFood(prev => ({ ...prev, food_status: "donated" }));
      }
    } catch {
      toast.error("Failed");
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!food) return <p className="text-center py-20">Not found</p>;

  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <img src={food.image} alt={food.name} className="w-full h-80 object-cover rounded-xl mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-4">{food.name}</h1>
        <p className="text-lg text-gray-700 mb-2">{food.quantityText}</p>
        <p className="text-gray-600 mb-2">Location: {food.pickupLocation}</p>
        <p className="text-gray-500 mb-4">
          Expire: {new Date(food.expireDate).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-3 mb-6">
          <img
            src={food.donator?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={food.donator?.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{food.donator?.name}</p>
            <p className="text-sm text-gray-500">{food.donator?.email}</p>
          </div>
        </div>
        {food.notes && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-medium">Notes:</p>
            <p className="text-gray-700">{food.notes}</p>
          </div>
        )}
        {!isOwner && food.food_status === "Available" && (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-success text-white w-full mb-6"
          >
            Request Food
          </button>
        )}
        {food.food_status === "donated" && (
          <p className="text-red-600 font-bold text-center mb-6">Already Donated</p>
        )}
      </div>

      {/* Owner: Request Table */}
      {isOwner && requests.length > 0 && (
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Food Requests</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Location</th>
                  <th>Reason</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={req.requester.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{req.requester.name}</span>
                      </div>
                    </td>
                    <td>{req.location}</td>
                    <td>{req.reason}</td>
                    <td>{req.contactNo}</td>
                    <td>
                      <span className={`badge ${req.status === "accepted" ? "badge-success" : req.status === "rejected" ? "badge-error" : "badge-warning"}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatus(req._id, "accepted")}
                            className="btn btn-success btn-xs mr-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatus(req._id, "rejected")}
                            className="btn btn-error btn-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Request Food</h3>
            <input
              name="location"
              placeholder="Your pickup location"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <textarea
              name="reason"
              placeholder="Why do you need this food?"
              className="textarea textarea-bordered w-full mb-3"
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
            <input
              name="contactNo"
              placeholder="Contact number"
              className="input input-bordered w-full mb-4"
              onChange={(e) => setForm({ ...form, contactNo: e.target.value })}
            />
            <div className="flex gap-3">
              <button onClick={handleRequest} className="btn btn-success flex-1">
                Submit
              </button>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FoodDetails;