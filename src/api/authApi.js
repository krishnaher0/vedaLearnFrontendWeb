import axios from './api';
export const registerUserApi=async(data)=>{
    const response = await axios.post("/auth/register",data)
    return response
} 
export const loginUserApi=async(data)=> {
    console.log(data)
   const response=await axios.post("/auth/login",data)
   return response
}