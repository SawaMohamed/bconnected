import { Link } from 'react-router-dom'
import React from 'react'
import Logout from '../components/Logout';

const NavDashboard = () => {
  return (
    <div>
      <nav className='dashboard-nav'>
        <Link to='/fav'>Favorites</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/onboarding'>Options</Link>
        <Link to='/chat'>Chat</Link>
        <Logout />
      </nav>
    </div>
  )
}

export default NavDashboard
