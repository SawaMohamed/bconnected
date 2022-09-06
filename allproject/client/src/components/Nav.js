import Small from '../images/small.png'
import Logo from '../images/BConnected-logo.png'


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
<<<<<<< HEAD
          src={minimal ? Logo : Logo}
=======
          src={ whiteLogo}
>>>>>>> main
          alt='logo'
        />
      <div className='title'>
      <h1 className='primary-title'></h1>
      <h2 className='second-title'></h2>
      </div>
      </div>
<<<<<<< HEAD

      
      {!authToken && !minimal && (
=======
      {  (!authToken&&
>>>>>>> main
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
