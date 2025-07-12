import React from "react";
import Header from "../components/userPage/Header";
import Footer from "../components/userPage/Footer";
import UserCourseCard from "../components/userPage/UserCourseCard";
import { motion } from "framer-motion";
import { useGetCourses } from "../hooks/admin/useAdminCourse";




const HomePage = () => {
 const { data: courses = [], isLoading, isError }  = useGetCourses();
  return (
    <>
      <Header />

      <div className="bg-yellow-100 text-yellow-800 text-center py-1 text-xs font-medium">
        Now supporting Sanskrit & Nepali!
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 text-center">

        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Learn Ancient <span className="text-orange-500">Sanskrit</span> & Beautiful <span className="text-green-500">Nepali</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Discover the beauty of ancient wisdom and mountain culture. Learn Sanskrit and Nepali through fun, bite-sized lessons that fit into your daily routine.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <button className="bg-green-500 text-white px-6 py-3 rounded">Start Learning Free</button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded">Join 10M+ Learners</button>
        </motion.div>

        <motion.div
          className="flex justify-center gap-8 mb-8 flex-wrap"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {["10M+", "500+", "95%", "4.8★"].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <strong>{stat}</strong><br />{["Active Learners", "Lessons", "Success Rate", "App Rating"][idx]}
            </motion.div>
          ))}
        </motion.div>

        <h2 className="text-xl font-semibold mb-6">Choose Your Learning Journey</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
  {courses.slice(0, 2).map((course, idx) => (
    <motion.div
      key={course._id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + idx * 0.2 }}
      whileHover={{ scale: 1.03 }}
    >
      <UserCourseCard course={course} />
    </motion.div>
  ))}
</div>


        <h2 className="text-xl font-semibold mb-6">Why Choose VedLingo?</h2>

        <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-start bg-gray-50 rounded-lg p-4 shadow-sm"
            >
              <div className="text-3xl mb-2">{feat.icon}</div>
              <h3 className="font-semibold mb-1">{feat.title}</h3>
              <p className="text-sm text-gray-600">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-12 rounded-lg px-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="mb-6">Join millions discovering the beauty of Sanskrit and Nepali. Start your free journey today!</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-white text-green-600 px-6 py-3 rounded font-semibold">Start Free Trial</button>
            <button className="border border-white px-6 py-3 rounded">View Courses</button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
};

const features = [
  {
    icon: "⚡",
    title: "Bite-sized Lessons",
    desc: "Learn in just 5–15 minutes a day with our scientifically designed micro-lessons.",
  },
  {
    icon: "💜",
    title: "Gamified Learning",
    desc: "Earn XP, unlock achievements, and compete with friends to stay motivated.",
  },
  {
    icon: "🎯",
    title: "Personalized Path",
    desc: "AI adapts to your learning style and pace for maximum effectiveness.",
  },
  {
    icon: "🌏",
    title: "Cultural Context",
    desc: "Learn not just words, but the rich cultural heritage behind each language.",
  },
  {
    icon: "⭐",
    title: "Expert Content",
    desc: "Courses created by native speakers and linguistic experts.",
  },
  {
    icon: "📈",
    title: "Track Progress",
    desc: "Detailed analytics show your improvement and areas to focus on.",
  },
];

export default HomePage;
