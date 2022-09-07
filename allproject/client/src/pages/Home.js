import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

import Carousel from '../components/Carousel'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  const signOut = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      localStorage.removeItem('currentUser')
      window.location.reload()
      return
    }
    setShowModal(true)
    setIsSignUp(true)
  }

  return (
    <div className='overlay'>
      <Nav
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className='home'>
        <button className='primary-button' onClick={signOut}>
          {authToken ? 'Signout' : 'Create Account'}
        </button>
      <Carousel />

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  )
}
export default Home
