import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainLayout from "../layout/MainLayout";

import NormalUserRoute from "./NormalUserRoute";

import HomePage from "../pages/HomePage";

import DashboardContent from "../layout/DashboardContent";
import UserTable from "../components/admin/userTable";
import Dashboard from "../pages/admin/Dashboard";
import TeacherTable from "../components/admin/TeacherTable";
import WelcomeScreen from "../pages/WelcomeScreen";
import Courses from "../pages/admin/Course";
import Feedback from "../pages/admin/Feedback";
import Setting from "../pages/admin/Setting";
import Reports from "../pages/admin/Reports";
// import DashboardContent from '../layout/DashboardContent'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          // make a footer and apply in main layout "2025 - My App" // main
          layout will show in every routes below
          <Route path="/" element={<WelcomeScreen />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="/user/*" element={<NormalUserRoute />}>
          <Route path="*" element={<>404 Not Found</>}></Route>
        </Route>

        <Route path="/admin" element={<DashboardContent />}>
  <Route path="dashboard" element={<Dashboard />} /> // 
  <Route path="student" element={<UserTable />} />
  <Route path="teacher" element={<TeacherTable />} />
  <Route path="courses" element={<Courses />} />
  <Route path="reports" element={<Reports />} />
  <Route path="feedback" element={<Feedback />} />
  <Route path="settings" element={<Setting />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}
