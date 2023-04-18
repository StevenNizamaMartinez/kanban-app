import React from 'react'
import FormLogin from '../components/Form/FormLogin'
import './styles/Login.css'
import { Link } from 'react-router-dom'

function Login() {

  return (
    <main className='page--container'>
      <h2 className='title'>Login App Kanban</h2>
      <FormLogin/>
      <span className='redirect'>
        Aun no tienes una cuenta <Link to="/register"> Registrate</Link>
      </span>
      <p className='advertency'>
        La carga de la app para el inicio de sesion puede ser lenta <br /> al inicio debido al servidor de render.com <br />
        Por favor tener paciencia
        </p>
    </main>
  )
}

export default Login
