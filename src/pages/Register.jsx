

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters and contain 1 uppercase and 1 lowercase"
      );
      return;
    }
    try {
      await register(name, email, password, photoURL);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register for RentWheels
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Photo URL */}
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border px-3 py-2 rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          {/* Password with toggle */}
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

          {/* Register Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Register
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded mt-4"
        >
          Register with Google
        </button>

        {/* Already Registered */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

