import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetLessonsByCourse } from "../../hooks/admin/useAdminLesson";

export default function LessonsPage() {

  const navigate = useNavigate();
 const { courseId } = useParams();

  const { data: lessons = [], isLoading, isError } = useGetLessonsByCourse(courseId);

  if (isLoading) return <div className="text-center py-12">Loading lessons...</div>;
  if (isError) return <div className="text-center py-12 text-red-500">Error loading lessons.</div>;

  return (
    <>
    
    <div className="p-6 bg-gray-50 min-h-screen">
     
        
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lessons</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded transition"
        >
          Back to Courses
        </button>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center text-gray-500">No lessons found for this course.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 flex flex-col transition hover:shadow-2xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                Level: <span className="font-medium">{lesson.level}</span>
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Lesson No: <span className="font-medium">{lesson.lessonNo}</span>
              </p>
              <button    onClick={() => navigate(`/user/courses/${courseId}/lessons/${lesson._id}/questions`)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm mt-auto"
              >
                Start Lesson
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
// exports.getUserProgress = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId)
//       .populate("enrolledCourses.course")
//       .populate("enrolledCourses.lessonsCompleted");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     return res.status(200).json({ success: true, data: user.enrolledCourses });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
