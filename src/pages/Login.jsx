

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success(" Login Successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 1500); 
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success(" Google Login Successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
     
      <ToastContainer />

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to RentWheels
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border px-3 py-2 rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded mt-4 hover:bg-red-600 transition"
        >
          Login with Google
        </button>

        {/* Register Link */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



