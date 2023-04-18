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
import axios from "axios"
import ProtectedRoutes from "./middleware/ProtectedRoutes"


function App() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {

    axios.get("https://kanban-api-5pni.onrender.com/").
    then(res => console.log(res.data))
    .catch(err => console.log(err))
    try {
      const token = localStorage.getItem("token")
    if (!token) return navigate("/")
    const decodeToken = decode(token)
    setUser(decodeToken.userDb)
    navigate("/home")
    } catch (error) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />}>
            <Route path='/home/:id' element={<Board />} />
          </Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
