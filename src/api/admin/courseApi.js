
import axios from "../api"


export const getAllCoursesApi = async () => {
    const token = localStorage.getItem("token");
  
  console.log("🔑 Sending token:", token);

  const response = await axios.get("/admin/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  }
);
console.log(response.data)

  return response.data.data;
};



export const createOneCourseApi = async (formData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post("/admin/courses", formData,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    },
    
  }
);
  return response.data;
};

// ✅ Update a course
export const updateOneCourseApi = async (courseId, formData) => {
    const token = localStorage.getItem("token");
  const response = await axios.put( `/admin/courses/${courseId}`, formData,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    },
    
  });
  console.log(response)
  return response.data;
};

// ✅ Delete a course
export const deleteOneCourseApi = async (courseId) => {
    const token = localStorage.getItem("token");
  const response = await axios.delete(`${"/admin/courses"}/${courseId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });
  return response.data;
};