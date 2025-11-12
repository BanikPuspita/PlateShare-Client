import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RequestFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contactNo: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error("Error fetching food:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodId: id,
          ...formData,
        }),
      });

      if (res.ok) {
        alert("Request sent successfully!");
        navigate("/");
      } else {
        const err = await res.json();
        alert(err.message || "Failed to send request");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (!food) return <p className="text-center mt-10">Loading food details...</p>;

  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Request Food: {food.name}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="location"
          placeholder="Your location"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          placeholder="Why you need this food?"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactNo"
          placeholder="Your contact number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestFood;
