import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // Add your login API logic here
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen px-10 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Log to Your Profile{" "}
        <span className="text-blue-600 font-bold">Now!</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Log to a profile to save your learning progress and keep learning for
        free!
      </p>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div>
          <label className="text-sm font-semibold text-blue-700">
            Input Your Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700">
            Input Your Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
          Login
        </button>

        <button
          type="button"
          className="w-full border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2">
          <span>Login With Google</span>
          <span className="text-xs">ⓖ</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
