import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { addFood } from "../../api/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddFood = ({ onFoodAdded }) => { // <-- add callback prop
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
    setForm((prev) => ({ ...prev, [name]: value }));
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
      const addedFood = await addFood(payload);
      toast.success("Food added successfully");

      if (onFoodAdded) onFoodAdded(addedFood); // <-- trigger refresh

      navigate("/manage-foods");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add food");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">
        Add Food
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Food Name"
          required
          className="input input-bordered w-full"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
        />
        <input
          name="quantityText"
          value={form.quantityText}
          onChange={handleChange}
          placeholder="Quantity text (e.g. Serves 2 people)"
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="quantityNumber"
          value={form.quantityNumber}
          onChange={handleChange}
          min="1"
          required
          className="input input-bordered w-full"
        />
        <input
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          required
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="expireDate"
          value={form.expireDate}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          className="textarea textarea-bordered w-full"
        />
        <button
          disabled={submitting}
          type="submit"
          className="btn btn-primary w-full mt-2"
        >
          {submitting ? "Adding..." : "Add Food"}
        </button>
      </form>
    </section>
  );
};

export default AddFood;
