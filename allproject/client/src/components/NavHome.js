import { Link } from 'react-router-dom'
import React from 'react'
import Logout from '../components/Logout';

const NavDashboard = () => {
  return (
    <div>
      <nav className='dashboard-nav'>

        <Link className="nav-link" style={{textDecoration: 'none'}} to='/onboarding'>Options</Link>
        <Link className="nav-link" style={{textDecoration: 'none'}} to='/dashboard'>Dashboard</Link>
        <Link className="nav-link" style={{textDecoration: 'none'}} to='/fav'>Favorites</Link>
        <Link className="nav-link" style={{textDecoration: 'none'}} to='/chat'>Chat</Link>

        <Logout />

      </nav>
    </div>
  )
}

export default NavDashboard
