import React from 'react'

function Button({title = "Save",titleLoad = "Loading..."}) {

  const [loading, setLoading] = React.useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 500)
  }

  return (
    <button onClick={handleClick}>{loading ? `${titleLoad}` : `${title}`}</button>
  )
}

export default Button
