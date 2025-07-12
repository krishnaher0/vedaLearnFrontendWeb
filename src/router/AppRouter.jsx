import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainLayout from "../layout/MainLayout";

import NormalUserRoute from "./NormalUserRoute";

import DashboardContent from "../layout/DashboardContent";
import UserTable from "../components/admin/userTable";
import Dashboard from "../pages/admin/Dashboard";
import TeacherTable from "../components/admin/TeacherTable";
import WelcomeScreen from "../pages/WelcomeScreen";
import Courses from "../pages/admin/Course";
import Feedback from "../pages/admin/Feedback";
import Lessons from "../pages/admin/Lessons";
import Setting from "../pages/admin/Setting";
import Reports from "../pages/admin/Reports";
import Question from "../pages/admin/Question";
import HomePage from "../pages/HomePage";
import LessonsPage from "../components/userPage/LessonPage";
import UserLessonPlayer from "../components/userPage/UserLessonPlayer";
// import DashboardContent from '../layout/DashboardContent'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
           <Route element={<MainLayout />}>
      {/* All routes below will include Footer */}
      <Route path="/" element={<HomePage />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/user/*" element={<NormalUserRoute />}>
        <Route path="courses/:courseId/lessons" element={<LessonsPage />} />
<Route path="courses/:courseId/lessons/:lessonId/questions" element={<UserLessonPlayer />} />
        <Route path="*" element={<>404 Not Found</>} />
      </Route>
    </Route>

        <Route path="/admin" element={<DashboardContent />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student" element={<UserTable />} />
          <Route path="teacher" element={<TeacherTable />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId/lessons" element={<Lessons />} />
          <Route
            path="courses/:courseId/lessons/:lessonId/questions"
            element={<Question />}
          />
          <Route path="reports" element={<Reports />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
