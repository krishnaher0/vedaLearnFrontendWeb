import { toast } from "react-toastify";
import { loginUserService } from "../services/authServices";
import {useMutation} from "@tanstack/react-query"
import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthProvider";


export const useLoginUser= ()=>{
    const {login}=useContext(AuthContext);
    return useMutation(
        {
            mutationFn:loginUserService,
            mutationKey:['login-key'],
            onSuccess:(data)=>{
                toast.success(data?.message || "Login success")
                login(data?.user, data?.token);
            },
            onError:(err)=>{
                toast.error(err?.message || "Login Failed")
            }
        }
    )
}
export default useLoginUser;
