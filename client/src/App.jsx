import "./Animate.css"
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Board from './pages/Board'
import { Toaster } from "react-hot-toast"
import Register from "./pages/Register"
import PageNotFound from "./pages/NotFound"
import decode from "jwt-decode"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"


function App() {
  const {setUser} = useAuth()
  const navigate  = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (!token) return navigate("/login")
    const decodeToken = decode(token)
    setUser(decodeToken.userDb)
    const tokenExpire = decodeToken.exp * 1000
    const currentTime = new Date().getTime()
    if(decodeToken.exp * 1000 < new Date().getTime()){
      localStorage.removeItem("token")
      navigate("/login")
    }
    navigate("/home")
  },[])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />}>
          <Route path='/home/:id' element={<Board />} />
        </Route>
      <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
