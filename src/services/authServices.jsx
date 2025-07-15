import { loginUserApi, registerUserApi,requestResetPasswordApi,resetPasswordApi } from "../api/authApi";
export const registerUserService= async(formData)=>{
    try{
        const response= await registerUserApi(formData)
        return response.data// body of response
    }catch(err){
        throw err.response?.data || {message:"Registration failed"}
    }
}
export const loginUserService=async (formData)=>{
    console.log(formData)
    try{
        const response=await loginUserApi(formData)
        return response.data
    }catch(err){
        throw err.response?.dat ||{message:"Login failed"}
    }
}

export const requestResetPasswordService = async (formData) => {
  try {
    const response = await requestResetPasswordApi(formData);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Request Reset Password Failed" };
  }
};
 
export const resetPasswordService = async (data, token) => {
  try {
    console.log("Reset Password Data:", data, "Token:", token);
    const response = await resetPasswordApi(data, token);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Reset Password Failed" };
  }
}
