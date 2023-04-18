import React from 'react'
import './ButtonForm.css'
import { Oval } from 'react-loader-spinner'

function ButtonForm({ loader, textLoading, text }) {
  return (
    <button className='btn-form'> {
      loader ?
        <Oval width="18" height="18" ariaLabel="Loading"  wrapperStyle
        wrapperClass color='white'/>
      :
      `${text}`
    } </button>
  )
}

export default ButtonForm
