import { getAllUserApi } from "../../api/admin/userApi";

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