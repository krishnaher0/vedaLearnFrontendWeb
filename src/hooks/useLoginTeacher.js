import { toast } from "react-toastify";
import { loginTeacherService } from "../services/authServices";
import {useMutation} from "@tanstack/react-query"
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";



export const useLoginTeacher= ()=>{
    const navigate=useNavigate();
    const {login,role}=useContext(AuthContext);
    return useMutation(
        {
            mutationFn:loginTeacherService,
            mutationKey:['login-key'],
            onSuccess:(data)=>{
                console.log(data)
                toast.success(data?.message || "Login success")
                login(data?.data, data?.token);
                
                if( data?.data.role==="Admin" || data?.data.role==="Teacher"){
                    navigate("/admin/dashboard")
                }
                else if(data?.data.role=="Learner"){
                    navigate("/")
                    
                }
            },
            onError:(err)=>{
                toast.error(err?.message || "Login Failed")
            }
        }
    )
}
export default useLoginTeacher;
