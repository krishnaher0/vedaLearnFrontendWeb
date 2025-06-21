// import React, { useState, useEffect } from "react";

// export default function TeacherForm({ teacher, onCancel, onSave }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     age: "",
//     password: "",
//     cv: null,
//   });

//   useEffect(() => {
//     if (teacher) {
//       setFormData({
//         name: teacher.name,
//         email: teacher.email,
//         age: teacher.age,
//         password: "",    // don't prefill password on edit
//         cv: null,
//       });
//     }
//   }, [teacher]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFile = (e) => {
//     setFormData((prev) => ({ ...prev, cv: e.target.files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = new FormData();
//     payload.append("name", formData.name);
//     payload.append("email", formData.email);
//     payload.append("age", formData.age);
    
//     if (!teacher) {
//       // For create only: add password & default role
//       payload.append("password", formData.password);
//       payload.append("role", "Teacher");
//     }
//     if (formData.cv) {
//       payload.append("cvImage", formData.cv);
//     }

//     onSave(payload);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 mb-6 rounded shadow-md">
//       <h3 className="text-xl font-bold mb-4">{teacher ? "Edit" : "Add"} Teacher</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Name */}
//         <div>
//           <label>Name</label>
//           <input name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//         </div>
//         {/* Email */}
//         <div>
//           <label>Email</label>
//           <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//         </div>
//         {/* Age */}
//         <div>
//           <label>Age</label>
//           <input name="age" type="number" value={formData.age} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//         </div>
//         {/* Password – only on create */}
//         {!teacher && (
//           <div>
//             <label>Password</label>
//             <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
//           </div>
//         )}
//         {/* CV upload */}
//         <div>
//           <label>CV</label>
//           <input type="file" name="cv" accept="image/*" onChange={handleFile} className="w-full" />
//         </div>
//       </div>
//       <div className="mt-4 flex gap-4">
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Save
//         </button>
//         <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

import React, { useState, useEffect } from "react";

export default function TeacherForm({ teacher, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    cv: null,
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name,
        email: teacher.email,
        age: teacher.age,
        password: "",    // don't prefill password on edit
        cv: null,
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setFormData((prev) => ({ ...prev, cv: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("age", formData.age);
    
    if (!teacher) {
      // For create only: add password & default role
      payload.append("password", formData.password);
      payload.append("role", "Teacher");
    }
    if (formData.cv) {
      payload.append("cvImage", formData.cv);
    }

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 mb-6 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">{teacher ? "Edit" : "Add"} Teacher</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        {/* Email */}
        <div>
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        {/* Age */}
        <div>
          <label>Age</label>
          <input name="age" type="number" value={formData.age} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        {/* Password – only on create */}
        {!teacher && (
          <div>
            <label>Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
        )}
        {/* CV upload */}
        <div>
          <label>CV</label>
          <input type="file" name="cv" accept="image/*" onChange={handleFile} className="w-full" />
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}

