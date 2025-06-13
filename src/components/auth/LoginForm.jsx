import React, { useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { mutate, error, data, isPending, isError, isSuccess } = useLoginUser();
  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "minimum 8 characters required ")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });
  const navigate = useNavigate();
  const handleregister = (err) => {
    err.preventDefault();
    navigate("/register");
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

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm space-y-4">
        <div>
          <label className="text-sm font-semibold text-blue-700">
            Input Your Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700">
            Input Your Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
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
      <div>
        Don't have an account?{" "}
        <button onClick={handleregister}> Register</button>
      </div>
    </div>
  );
};

export default LoginForm;
