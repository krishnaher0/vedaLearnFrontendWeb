// // src/pages/CourseDetailsPage.jsx
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// // import { useGetCourseById, useGetLessonsByCourse, useAddLesson, useUpdateLesson, useDeleteLesson } from '../../hooks/useLessonHooks';
// // import LessonForm from '../components/LessonForm'; // New component for Lesson CRUD

// export default function CourseDetailsPage() {
//   const { courseId } = useParams();
//   // const { data: course, isLoading: courseLoading } = useGetCourseById(courseId);
//   // const { data: lessons = [], isLoading: lessonsLoading } = useGetLessonsByCourse(courseId);

//   const [showLessonForm, setShowLessonForm] = useState(false);
//   const [selectedLesson, setSelectedLesson] = useState(null);

//   const handleAddLesson = () => { /* ... */ };
//   const handleEditLesson = (lesson) => { /* ... */ };
//   const handleDeleteLesson = (lessonId) => { /* ... */ };
//   const handleSaveLesson = (formData) => { /* ... */ };
//   const handleCancelLesson = () => { /* ... */ };

//   // if (courseLoading || lessonsLoading) return <div className="text-center py-4">Loading...</div>;
//   // if (!course) return <div className="text-red-500 text-center py-4">Course not found.</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Lesson Form Modal */}
//       {showLessonForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6 overflow-y-auto max-h-[90vh]">
//             {/* <LessonForm lesson={selectedLesson} courseId={courseId} onCancel={handleCancelLesson} onSave={handleSaveLesson} /> */}
//           </div>
//         </div>
//       )}

//       {/* Course Header/Overview (like your screenshot) */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-3xl font-bold text-gray-900 mb-2">{/* course.language */}</h2>
//         <p className="text-gray-600 mb-4">{/* course.description */}</p>
//         {/* Flag Image (if applicable) */}
//         {/* course.flagPath && (
//           <img src={`http://localhost:3001/${course.flagPath}`} alt="Course Flag" className="h-24 w-auto object-cover rounded-md mb-4" />
//         ) */}
//         <div className="flex space-x-3 mb-6">
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Publish Course</button>
//           <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition">Preview</button>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
//           {/* Stats cards */}
//           <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//             <p className="text-2xl font-bold text-gray-900">120</p>
//             <p className="text-sm text-gray-600">Enrolled</p>
//           </div>
//           {/* ... other stats ... */}
//         </div>
//       </div>

//       {/* Lessons Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">Lessons</h3>
//           <button onClick={handleAddLesson} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition">
//             + Add Lesson
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Level</th>
//                 <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lesson No.</th>
//                 <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
//                 <th className="py-2 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {/* {lessons.map((lesson, index) => ( */}
//                 <tr key={/* lesson._id */} className={/* index % 2 === 0 ? 'bg-white' : 'bg-gray-50' */}>
//                   <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-800">{/* lesson.level */}</td>
//                   <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-800">{/* lesson.lessonNo */}</td>
//                   <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-800">{/* lesson.title */}</td>
//                   <td className="py-2 px-4 text-center space-x-2">
//                     <button onClick={() => handleEditLesson(/* lesson */)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition">Edit</button>
//                     <button onClick={() => handleDeleteLesson(/* lesson._id */)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition">Delete</button>
//                     {/* Add a button to view questions for this lesson */}
//                     {/* <Link to={`/admin/lessons/${lesson._id}`} className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm transition">View Questions</Link> */}
//                   </td>
//                 </tr>
//               {/* ))} */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }