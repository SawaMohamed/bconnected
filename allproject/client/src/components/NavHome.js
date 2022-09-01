import { Link } from 'react-router-dom'
import React from 'react'

const NavDashboard = () => {
  return (
    <div>
      <nav className='dashboard-nav'>
        <Link to='/fav'>Favorites</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/onboarding'>Options</Link>
        <Link to='/chat'>Chat</Link>
      </nav>
    </div>
  )
}

export default NavDashboard
