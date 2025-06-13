import { createContext,useState,useEffect } from "react";
import React from 'react'
 export const AuthContext = createContext();
 const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const login=(userData,token)=>{
        setLoading(true);
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("token",token);
        setUser(userData);
        setLoading(false);
    }
    const logout=()=>{
        setLoading(true);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
    }
    useEffect(()=>{
        setLoading(true);
        const existingUser=JSON.parse(localStorage.getItem("user"));
        const token=localStorage.getItem("token");
        if(token && existingUser){
            setUser(existingUser);
       
    }else{
        logout();
    }
    setLoading(false);
},
        []);
    return(
        <AuthContext.Provider value={{user,login,logout,isAuthenticated:user!==null}}>
            {children}
        </AuthContext.Provider>
    )
 }
 export default AuthContextProvider;