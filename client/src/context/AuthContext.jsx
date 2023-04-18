import { createContext,useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginRequest, logoutRequest, registerRequest } from "../api/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookie } from "react-use";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const navigate = useNavigate()
  
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setLoadingAuth(false)
      toast.success("Login success")
      console.log(data);
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setUser(data.userDb)
      navigate('/home')
    },
    onError: (error) => {
      setLoadingAuth(false)
      error.response?.data?.message ? toast.error(error.response?.data?.message) : 
      toast.error("Login failed")
    }
  })

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      setLoadingAuth(false)
      toast.success("Register success")
      console.log(data);
      navigate('/home')
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setUser(data.user)
    },
    onError: (error) => {
      setLoadingAuth(false)
      error.response?.data?.message ? toast.error(error.response?.data?.message) : 
      toast.error("Login failed")
    }
  })

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      toast.success("Logout success")
      console.log(data);
      localStorage.removeItem("token")
      navigate('/')
    },
    onError: (error) => {
      error.response?.data?.message ? toast.error(error.response?.data?.message) : 
      toast.error("Login failed")
    }
  })


  return (
    <AuthContext.Provider value={{loginMutation, logoutMutation, registerMutation, token, user, setUser, loadingAuth, setLoadingAuth}} >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
