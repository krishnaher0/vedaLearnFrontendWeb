import React, { useState } from "react";
import { useFormik } from "formik";
import useRegisterUser from "../../hooks/useRegisterUser";
import * as Yup from "yup";

const RegisterForm = () => {
  const { mutate, error, data, isError, isPending, isSuccess } =
    useRegisterUser();
  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    name: Yup.string().required("name is required"),
    age: Yup.number().required("Age is required"),
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

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen px-10 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Create Your Profile{" "}
        <span className="text-blue-600 font-bold">Now!</span>
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Create a profile to save your learning progress and keep learning for
        free!
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm space-y-4">
        <div>
          <label className="text-sm font-semibold text-blue-700"> Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700"> Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formik.values.age}
            onChange={formik.handleChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700"> Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-blue-700 -center">
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
    </div>
  );
};

export default RegisterForm;
