import React, { useState } from "react";
import { useRequestResetPassword } from "../hooks/forgotPasswordHook";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function RequestResetPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useRequestResetPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/your-background.jpg')", // Replace with real path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <img
            src="src/assets/logo/vedlogo.png" // Replace with your actual logo path
            alt="VedLingo Logo"
            className="w-20 h-20 mb-2"
          />
         
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mt-6">
          Forgot your <span className="text-blue-600">password?</span>
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Don’t worry! We’ll help you reset it in no time.<br />
          Just enter your email below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-semibold text-white rounded-lg transition-all bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline flex justify-center items-center gap-1"
          >
            ← Back to Login
          </Link>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          Still having trouble? Contact our support team at{" "}
          <a href="mailto:support@vedlingo.com" className="text-blue-600 font-medium underline">
            support@vedlingo.com
          </a>
        </p>
      </div>
    </div>
  );
}
