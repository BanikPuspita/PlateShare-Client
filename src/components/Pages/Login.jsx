import React, { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react"; // Importing Eye icons

const Login = () => {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      toast.success("Logged in successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.message);
      setLoginError(err.message); // Displaying error message
      console.log(err);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      navigate("/");
      toast.success("Logged in successfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
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
        {loginError && <p className="text-sm text-red-500">{loginError}</p>}
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
      <button onClick={handleGoogle} className="btn btn-outline w-full mt-4">
        <FcGoogle size={20} />
        Login with Google
      </button>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;