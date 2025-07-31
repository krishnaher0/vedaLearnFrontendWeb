import { getAllUserApi,updateOneUserApi } from "../../api/admin/userApi";

export const getAllUserService = async (params) => {
console.log(params)
    try{
        const response = await getAllUserApi(params)
        console.log(response.data)
        return response.data
    }catch(err){
        console.log(err)
        throw err.response?.data || { 'message' : 'User Fetch Fail' }
    }
}
export const updateOneUserService = async ({ id, data }) => {
  try {
    const response = await updateOneUserApi(id, data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err.response?.data || { message: "User Update Failed" };
  }
};
