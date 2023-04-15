import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './styles/NotFound.css'

function PageNotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1)
  }
  return (
    <main className='notfound--container'>
      <picture className='notfound'>
        <img src="./notFound.svg" />
        <h2>PAGE NOT FOUND !!!</h2>
        <button onClick={handleClick}>Return</button>
      </picture>
    </main>
  )
}

export default PageNotFound
