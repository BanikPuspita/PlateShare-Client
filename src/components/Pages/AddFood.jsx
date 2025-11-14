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
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.data.url }));
        toast.success("Image uploaded!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const payload = {
        name: form.name,
        image: form.image,
        quantityText: form.quantityText,
        quantityNumber: Number(form.quantityNumber),
        pickupLocation: form.pickupLocation,
        expireDate: form.expireDate,
        notes: form.notes,
      };

      console.log("Sending payload:", payload); 

      const result = await addFood(payload);
      console.log("Food added:", result);

      toast.success("Food added successfully!");
      navigate("/manage-foods");
    } catch (err) {
      console.error("Add food error:", err);
      toast.error(err.message || "Failed to add food");
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
          placeholder="Food Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="input input-bordered w-full"
        />
        
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="file-input file-input-bordered w-full"
            disabled={uploading}
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="mt-3 h-40 w-full object-cover rounded-lg"
            />
          )}
        </div>

        <input
          name="quantityText"
          placeholder="e.g., Serves 4 people"
          value={form.quantityText}
          onChange={(e) => setForm({ ...form, quantityText: e.target.value })}
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="quantityNumber"
          value={form.quantityNumber}
          onChange={(e) => setForm({ ...form, quantityNumber: e.target.value })}
          min="1"
          required
          className="input input-bordered w-full"
        />

        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          value={form.pickupLocation}
          onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
          required
          className="input input-bordered w-full"
        />

        <input
          type="date"
          name="expireDate"
          value={form.expireDate}
          onChange={(e) => setForm({ ...form, expireDate: e.target.value })}
          required
          className="input input-bordered w-full"
        />

        <textarea
          name="notes"
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="textarea textarea-bordered w-full"
        />

        <button
          type="submit"
          disabled={uploading || !form.image}
          className="btn btn-primary w-full"
        >
          {uploading ? "Uploading Image..." : "Add Food"}
        </button>
      </form>
    </section>
  );
};

export default AddFood;