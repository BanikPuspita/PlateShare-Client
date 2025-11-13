import React, { useEffect, useState } from "react";
import { getFoodById, updateFood } from "../../api/foods";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFoodById(id);
        setForm({
          name: data.name || "",
          image: data.image || "",
          quantityText: data.quantityText || "",
          quantityNumber: data.quantityNumber || 1,
          pickupLocation: data.pickupLocation || "",
          expireDate: data.expireDate ? data.expireDate.split("T")[0] : "",
          notes: data.notes || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load food details");
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateFood(id, {
        ...form,
        quantityNumber: Number(form.quantityNumber),
      });
      toast.success("Food updated successfully");
      navigate("/manage-foods");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update food");
    } finally {
      setSubmitting(false);
    }
  };

  if (!form)
    return (
      <p className="text-center py-16 text-gray-500 text-lg">Loading...</p>
    );

  return (
    <section className="max-w-xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Update Food
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="input input-bordered w-full"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          name="quantityText"
          value={form.quantityText}
          onChange={handleChange}
          placeholder="Quantity text"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="quantityNumber"
          value={form.quantityNumber}
          onChange={handleChange}
          min="1"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="expireDate"
          value={form.expireDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          className="textarea textarea-bordered w-full"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary w-full mt-2"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default UpdateFood;
