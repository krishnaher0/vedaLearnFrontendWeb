import React from "react";


import RightSidePanel from "../components/RightImagePanel";
import LoginForm from "../components/LoginForm";

const LoginPage = () => 
  (
    <div className="flex flex-col-reverse md:flex-row h-screen font-sans">
      <LoginForm />

      {/* Right Panel (Reusable) */}
      <RightSidePanel title="Welcome Back!" subtitle="Log in to continue your learning journey" />
    </div>
  );

export default LoginPage;
