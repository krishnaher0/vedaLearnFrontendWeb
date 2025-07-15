import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../hooks/forgotPasswordHook"; // Adjust if needed

// Reusable styled Input
const Input = (props) => (
  <input
    {...props}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
  />
);

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading } = useResetPassword();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      // Send only password and token to backend
      resetPassword({ data: values, token });
    },
  });

  if (!token) {
    return (
      <div className="text-center mt-10 text-red-500">
        Invalid or missing token.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset your password</h2>
        <p className="text-gray-600 text-center text-sm mb-6">
          Please enter your new password below.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
