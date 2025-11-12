// src/components/Pages/AddFood.jsx
import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { addFood } from "../../api/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    quantityText: "",
    quantityNumber: 1,
    pickupLocation: "",
    expireDate: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        quantityNumber: Number(form.quantityNumber),
        donator: {
          name: user.displayName || user.email.split("@")[0],
          email: user.email,
          photoURL: user.photoURL || "",
        },
      };
      await addFood(payload);
      toast.success("Food added successfully");
      navigate("/available-foods");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto my-8 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Add Food</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Food Name" required className="input" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL (use imgbb link)" required className="input" />
        <input name="quantityText" value={form.quantityText} onChange={handleChange} placeholder="Quantity text e.g. Serves 2 people" required className="input" />
        <input type="number" name="quantityNumber" value={form.quantityNumber} onChange={handleChange} min="1" required className="input" />
        <input type="text" name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="Pickup Location" required className="input" />
        <input type="date" name="expireDate" value={form.expireDate} onChange={handleChange} required className="input" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Additional notes" className="textarea" />
        <button disabled={submitting} type="submit" className="btn btn-primary">
          {submitting ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
