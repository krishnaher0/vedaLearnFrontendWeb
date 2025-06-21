// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAddCourse } from '../../hooks/admin/useAdminCourse';

// const CourseForm = () => {
//   const [language, setLanguage] = useState('');
//   const [description, setDescription] = useState('');
//   const [flagPath, setFlagPath] = useState('');

//   const { mutate: addCourse, isLoading } = useAddCourse(refetch);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = {
//       language,
//       description,
//       flagPath,
//     };

//     addCourse(formData, {
//       onSuccess: () => {
//         // Clear form on success
//         setLanguage('');
//         setDescription('');
//         setFlagPath('');
//       },
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-md shadow-md w-full max-w-md">
//       <h2 className="text-xl font-bold mb-4">Add Course</h2>
//       <input
//         type="text"
//         placeholder="Language"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         className="w-full p-2 mb-3 rounded bg-gray-700"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full p-2 mb-3 rounded bg-gray-700"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Flag Image Path"
//         value={flagPath}
//         onChange={(e) => setFlagPath(e.target.value)}
//         className="w-full p-2 mb-3 rounded bg-gray-700"
//       />
//       <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default CourseForm;
