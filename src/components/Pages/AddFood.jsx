import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { addFood } from "../../api/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", image: "", quantityText: "", quantityNumber: 1,
    pickupLocation: "", expireDate: "", notes: ""
  });
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setForm(prev => ({ ...prev, image: data.data.url }));
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFood({
        ...form,
        quantityNumber: Number(form.quantityNumber),
        donator: { name: user.displayName, email: user.email, photoURL: user.photoURL }
      });
      toast.success("Food added!");
      navigate("/manage-foods");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <section className="max-w-lg mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-primary text-center mb-8">Add Food</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" placeholder="Food Name" required className="input input-bordered" onChange={e => setForm({ ...form, name: e.target.value })} />
        <div>
          <input type="file" accept="image/*" onChange={handleImage} className="file-input file-input-bordered w-full" disabled={uploading} />
          {form.image && <img src={form.image} alt="preview" className="mt-2 h-32 object-cover rounded" />}
        </div>
        <input name="quantityText" placeholder="Serves 2 people" required className="input input-bordered" onChange={e => setForm({ ...form, quantityText: e.target.value })} />
        <input type="number" name="quantityNumber" min="1" required className="input input-bordered" onChange={e => setForm({ ...form, quantityNumber: e.target.value })} />
        <input name="pickupLocation" placeholder="Pickup Location" required className="input input-bordered" onChange={e => setForm({ ...form, pickupLocation: e.target.value })} />
        <input type="date" name="expireDate" required className="input input-bordered" onChange={e => setForm({ ...form, expireDate: e.target.value })} />
        <textarea name="notes" placeholder="Notes" className="textarea textarea-bordered" onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Food"}
        </button>
      </form>
    </section>
  );
};

export default AddFood;