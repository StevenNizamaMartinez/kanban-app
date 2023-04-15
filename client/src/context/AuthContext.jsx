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
  const navigate = useNavigate()
  
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      toast.success("Login success")
      console.log(data);
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setUser(data.userDb)
      navigate('/home')
    }
  })

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      toast.success("Register success")
      console.log(data);
      navigate('/home')
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setUser(data.user)
    }
  })

  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: (data) => {
      toast.success("Logout success")
      console.log(data);
      localStorage.removeItem("token")
      navigate('/login')
    }
  })


  return (
    <AuthContext.Provider value={{loginMutation, logoutMutation, registerMutation, token, user, setUser}} >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
