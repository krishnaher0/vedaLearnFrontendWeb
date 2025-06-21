import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { registerUserService } from '../services/authServices'


export default function useRegisterUser(){
  return useMutation(
    {
        mutationFn:registerUserService,
        mutationKey:['register'],
        onSuccess:(data)=>{
            toast.success(data.message || "Registration successful")
        },
        onError:(err)=>{
            toast.error(err.message ||"Registration failed")
        }
    }
  );
}
