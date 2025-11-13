import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("Please login first");
          navigate("/login");
          return;
        }

        const token = await user.getIdToken();
        console.log("Token:", token); // Log token

        const res = await fetch("https://plate-share-server-chi.vercel.app/api/requests/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch requests:", res.statusText); // Log response status
          throw new Error("Failed to fetch requests");
        }

        const data = await res.json();
        setRequests(data);
        console.log("Fetched Requests:", data); // Log requests data
      } catch (error) {
        console.error("Error fetching requests:", error);
        alert("Failed to load your requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading your requests...</p>
    );

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
        You haven’t requested any food yet.
      </p>
    );

  return (
    <section className="max-w-5xl mx-auto py-36 px-4">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        My Food Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-base-100 border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="flex gap-4 p-4">
              {req.foodImage && (
                <img
                  src={req.foodImage}
                  alt={req.foodName}
                  className="w-28 h-28 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {req.foodName}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Donator:</strong> {req.donatorEmail}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Pickup Location:</strong> {req.location}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Reason:</strong> {req.reason}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Contact:</strong> {req.contactNo}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Requested on: {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyRequests;