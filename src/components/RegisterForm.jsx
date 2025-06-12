import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // For demo purposes only
    setSubmitted(true);
    console.log('Registered User:', formData);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen px-10 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Create Your Profile <span className="text-blue-600 font-bold">Now!</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Create a profile to save your learning progress and keep learning for free!
      </p>

      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
        <div>
          <label className="text-sm font-semibold text-blue-700"> Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700"> Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700"> Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700 -center"> Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <button
          type="button"
          className="w-full border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2"
        >
          <span>Signup With Google</span>
          <span className="text-xs">ⓖ</span>
        </button>
      </form>

      {submitted && (
        <div className="mt-6 text-green-600 text-sm">
          Registration complete! (No backend connected)
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
