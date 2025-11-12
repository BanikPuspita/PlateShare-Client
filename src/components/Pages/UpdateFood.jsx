// src/components/Pages/UpdateFood.jsx
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
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateFood(id, {
        ...form,
        quantityNumber: Number(form.quantityNumber),
      });
      toast.success("Updated");
      navigate("/manage-foods");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    } finally {
      setSubmitting(false);
    }
  };

  if (!form) return <div className="p-6">Loading...</div>;

  return (
    <div className="container mx-auto my-8 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Update Food</h2>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} className="input" required />
        <input name="image" value={form.image} onChange={handleChange} className="input" required />
        <input name="quantityText" value={form.quantityText} onChange={handleChange} className="input" required />
        <input type="number" name="quantityNumber" value={form.quantityNumber} onChange={handleChange} className="input" min="1" required />
        <input type="date" name="expireDate" value={form.expireDate} onChange={handleChange} className="input" required />
        <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} className="input" required />
        <textarea name="notes" value={form.notes} onChange={handleChange} className="textarea" />
        <button disabled={submitting} type="submit" className="btn btn-primary">{submitting ? "Saving..." : "Save"}</button>
      </form>
    </div>
  );
};

export default UpdateFood;
