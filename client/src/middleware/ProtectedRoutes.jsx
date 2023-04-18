import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import decode from "jwt-decode"
import { useAuth } from '../context/AuthContext'

function ProtectedRoutes() {

  const navigate = useNavigate()
  const { token } = useAuth()
  const { setUser } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return navigate("/")
    
    try {
      const decodeToken = decode(token)
      console.log(decodeToken);
      setUser(decodeToken.userDb)
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.log("Error al decodificar el token:", error)
      navigate("/")
    }
  }, [])
  

  return (
    <Outlet />
  )
}

export default ProtectedRoutes
