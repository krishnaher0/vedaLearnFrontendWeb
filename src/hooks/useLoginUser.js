import { toast } from "react-toastify";
import { loginUserService } from "../services/authServices";
import {useMutation} from "@tanstack/react-query"
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";



export const useLoginUser= ()=>{
    const navigate=useNavigate();
    const {login,role}=useContext(AuthContext);
    return useMutation(
        {
            mutationFn:loginUserService,
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
export default useLoginUser;
