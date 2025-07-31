import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";


import NormalUserRoute from "./NormalUserRoute";

import DashboardContent from "../layout/DashboardContent";
import UserTable from "../components/admin/userTable";
import Dashboard from "../pages/admin/Dashboard";
import TeacherTable from "../components/admin/TeacherTable";
import WelcomeScreen from "../pages/WelcomeScreen";
import Courses from "../pages/admin/Course";
import Feedback from "../pages/admin/Feedback";
import Lessons from "../pages/admin/Lessons";

import Question from "../pages/admin/Question";
import HomePage from "../pages/HomePage";
import LessonsPage from "../components/userPage/LessonPage";
import UserLessonPlayer from "../components/userPage/UserLessonPlayer";
import CoursePage from "../components/userPage/CoursePage";
import RequestResetPasswordPage from "../pages/RequestResetPassword";
import ResetPasswordPage from "../pages/ResetPassword";
import PaymentSuccess from "../components/userPage/PaymentSuccess";
import PaymentFailure from "../components/userPage/PaymentFailure";
import AudioGrid from "../components/AudioGrid";
import PaymentPage from "../components/userPage/PaymentPage";
import VideoGrid from "../components/videoGrid";
import UserSubscriptionsPage from "../components/admin/userSubscription";
import PlanPage from "../pages/planPage";
import LearningsPage from "../pages/admin/LearningsPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
           {/* <Route element={<MainLayout />}> */}
      {/* All routes below will include Footer */}
      <Route path="/" element={<HomePage />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/request-reset-password" element={<RequestResetPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> 

      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failure" element={<PaymentFailure />} />
       <Route path="esewa-redirect" element={<PaymentPage />} />


      <Route path="/user/*" element={<NormalUserRoute />}>
      <Route path="courses" element={<CoursePage />} />
      <Route path="learn/audio" element={<AudioGrid />} />
      <Route path="learn/video" element={<VideoGrid />} />

     
  
  <Route path="courses/:courseId/lessons" element={<LessonsPage />} />
  
  <Route path="courses/:courseId/lessons/:lessonId/questions" element={<UserLessonPlayer />} />
  
  <Route path="*" element={<>404 Not Found</>} />
</Route>

        <Route path="/admin" element={<DashboardContent />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student" element={<UserTable />} />
          <Route path="teacher" element={<TeacherTable />} />
          <Route path="courses" element={<Courses />} />
          <Route path="learnings" element={<LearningsPage />} />
          <Route path="subscribed-users" element={<UserSubscriptionsPage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="courses/:courseId/lessons" element={<Lessons />} />
          <Route
            path="courses/:courseId/lessons/:lessonId/questions"
            element={<Question />}
          />
         
          <Route path="chat" element={<Feedback />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
