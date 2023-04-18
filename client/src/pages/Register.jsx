import React from 'react'
import FormRegister from '../components/Form/FormRegister'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <main className='page--container'>
      <h2 className='title'>Register App Kanban</h2>
      <FormRegister/>
      <span className='redirect'>
        Ya tienes una cuenta <Link to="/"> Inicia Sesion</Link>
      </span>
      <p className='advertency'>
        La carga de la app para el inicio de sesion puede ser lenta <br /> al inicio debido al servidor de render.com <br />
        Por favor tener paciencia
        </p>
    </main>
  )
}

export default Register
