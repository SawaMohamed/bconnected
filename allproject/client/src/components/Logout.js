import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let navigate = useNavigate()

  const onClick = () => {
    navigate('/')
    window.location.reload()
  }
  return (
    <button className='logout-btn' onClick={onClick}>
      Logout
    </button>
  )
}

export default Logout
