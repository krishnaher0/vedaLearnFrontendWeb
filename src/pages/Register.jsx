import React from 'react'
import RegisterForm from '../components/RegisterForm.jsx'
import RightSidePanel from '../components/RightImagePanel.jsx'
import LoginForm from '../components/LoginForm.jsx'

export default function Register() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen font-sans">
      <RegisterForm />

      {/* Right Panel (Reusable) */}
        <RightSidePanel title="Welcome to VedaLearn!" subtitle="Create an account to start your learning journey" />
    </div>
  )
}
