import whiteLogo from '../images/tinder_logo_white.png'
import colorLogo from '../images/color-logo-tinder.png'

const Nav = ({ authToken, setShowModal, showModal, setIsSignUp }) => {

  // @desc remove form for login
  const handleClick = () => {
      setShowModal(true)
      setIsSignUp(false)
  }

  return (
    <nav>
      <div className='logo-container'>
        <img
          className='logo'
          src={ whiteLogo}
          alt='logo'
        />
      </div>
      {  (!authToken&&
        <button
          className='nav-button'
          onClick={handleClick}
          disabled={showModal}
        >
           Log in
        </button>
      )}
    </nav>
  )
}
export default Nav
