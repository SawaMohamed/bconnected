import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let navigate = useNavigate()

  const onClick = () => {
    navigate('/')
  }
  return <button onClick={onClick}>Logout</button>
}

export default Logout
