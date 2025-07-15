import React from "react";
import UserCourseCard from "../userPage/UserCourseCard";
import { motion } from "framer-motion";
import { useGetCourses } from "../../hooks/admin/useAdminCourse";
import Header from "./Header";
import { useUserProgress } from "../../hooks/useProgressUser";
import { AuthContext } from "../../auth/AuthProvider";
import { useContext } from "react";

const CoursePage = () => {
  const { data: courses = [], isLoading, isError } = useGetCourses();
  const { user } = useContext(AuthContext);
  const { data: progressData } = useUserProgress(user?._id);

  if (isLoading) {
    return <div className="text-center py-10">Loading courses...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load courses.
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <Header />

      {/* Hero section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 mt-16 text-center tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Choose Your Language Adventure
          </span>
        </h1>
        <p className="text-gray-600">
          From beginner to advanced, find the perfect course to match your
          learning goals
        </p>
      </section>

      {/* Course cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {courses.map((course, idx) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}>
            <UserCourseCard course={course} />
          </motion.div>
        ))}
      </div>

      {/* Gamified stats section */}
      <section id="leaderboard" className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Level Up Your Learning</h2>
        <p className="text-gray-600 mb-8">
          Earn XP, maintain streaks, and compete with friends in our gamified
          learning experience
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-orange-100 rounded-lg p-5 shadow">
            <div className="text-3xl">🔥</div>
            <h3 className="font-semibold mt-2">Daily Streaks</h3>
            <p className="text-gray-600 text-sm">
              Keep your momentum going every day
            </p>
            <div className="mt-2 font-bold text-orange-600 text-xl">
              {progressData?.dayStreak ?? 0}
            </div>
          </div>
          <div className="bg-blue-100 rounded-lg p-5 shadow">
            <div className="text-3xl">⭐</div>
            <h3 className="font-semibold mt-2">XP Points</h3>
            <p className="text-gray-600 text-sm">
              Earn points for every lesson
            </p>
            <div className="mt-2 font-bold text-blue-600 text-xl">
              {progressData?.xp ?? 0}
            </div>
          </div>
          <div className="bg-green-100 rounded-lg p-5 shadow">
            <div className="text-3xl">❤️</div>
            <h3 className="font-semibold mt-2">Hearts</h3>
            <p className="text-gray-600 text-sm">
              Lives that keep you in the game
            </p>
            <div className="mt-2 font-bold text-green-600 text-xl">
              {progressData?.hearts ?? 5}/5
            </div>
          </div>
          <div className="bg-yellow-100 rounded-lg p-5 shadow">
            <div className="text-3xl">🏆</div>
            <h3 className="font-semibold mt-2">Leaderboard</h3>
            <p className="text-gray-600 text-sm">Compete worldwide</p>
            <div className="mt-2 font-bold text-yellow-600 text-xl">
              #{progressData?.rank ?? 23}
            </div>
          </div>
        </div>

        <button className="mt-8 px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition">
          View My Progress
        </button>
      </section>
    </main>
  );
};

export default CoursePage;
