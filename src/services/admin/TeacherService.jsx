import { getAllTeacherApi,deleteOneTeacherApi, createOneTeacherApi, updateOneTeacherApi } from "../../api/admin/teacherApi";


export const getAllTeacherService = async (params) => {
console.log(params)
    try{
        const response = await getAllTeacherApi(params)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        throw err.response?.data || { 'message' : 'User Fetch Fail' }
    }
}
export const deleteTeacherService = async (teacherId) => {
  console.log("Deleting teacher ID:", teacherId);
  const response = await deleteOneTeacherApi(teacherId);
  return response.data;
};

export const registerTeacherService = async (formData) => {
  console.log("Registering teacher with form data:", formData);
  const response = await createOneTeacherApi(formData);
  return response.data;
};
export const updateTeacherService = async (teacherId, formData) => {
  const response = await updateOneTeacherApi(teacherId, formData);
  return response.data;
};


