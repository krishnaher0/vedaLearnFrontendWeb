import React, { useState } from "react";
import { useFormik } from "formik";
import useRegisterUser from "../../hooks/useRegisterUser"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { mutate, error, data, isError, isPending, isSuccess } =
    useRegisterUser();
  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    name: Yup.string().required("name is required"),
    age: Yup.number().required("Age is required").min(0,"number must be greater than negative value"),
    password: Yup.string()
      .min(6, "Minimun 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      age: 0,
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
   const navigate = useNavigate();
  const handlelogin = (err) => {
    err.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen px-10 bg-white">
      <h2 className="text-4xl font-semibold text-gray-800 mb-2">
        Create Your Profile{" "}
        <span className="text-blue-600 font-bold">Now!</span>
        <br></br>
      </h2>
      <p className="text-2xl text-gray-500 mb-6 text-center">
        Create a profile to save your learning progress and <br></br> keep learning for
        free!
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm space-y-4">
        <div>
          <label className="text-1.5xl font-semibold text-blue-700"> Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           {formik.touched.name && formik.errors.name && (
            <div className="text-1xl text-red-400"> {formik.errors.name}</div>
          )}
        </div>
        <div>
          <label className="text-1.5xl font-semibold text-blue-700"> Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formik.values.age}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           {formik.touched.age && formik.errors.age && (
            <div className="text-1xl text-red-400"> {formik.errors.age}</div>
          )}
        </div>
        <div>
          <label className="text-1.5xl font-semibold text-blue-700"> Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           {formik.touched.email && formik.errors.email && (
            <div className="text-1xl text-red-400"> {formik.errors.email}</div>
          )}
        </div>
        <div>
          <label className="text-1.5xl font-semibold text-blue-700 -center">
            {" "}
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
           {formik.touched.password && formik.errors.password && (
            <div className="text-1xl text-red-400"> {formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
          Signup
        </button>

        <button
          type="button"
          className="w-full border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2">
          <span>Signup With Google</span>
          {/* <span className="text-xs">ⓖ</span> */}
        </button>
      </form>
      <div className="h-10"></div>
      <div>
        Already have an account?{" "}
        <button onClick={handlelogin} className="text-blue-400 "> Login</button>
      </div>
    </div>
  );
};

export default RegisterForm;
