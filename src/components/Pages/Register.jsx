import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { register, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pwError, setPwError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passError = validatePassword(form.password);
    setPwError(passError);
    if (passError) return toast.error(passError);

    try {
      await register(form.name, form.email, form.password, form.photoURL);
      toast.success("Account created successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL (Optional)"
          value={form.photoURL}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {pwError && <p className="text-sm text-red-500">{pwError}</p>}
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
      <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
        <FcGoogle size={20} />
        Register with Google
      </button>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;