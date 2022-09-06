import Small from '../images/small.png'
import Logo from '../images/BConnected-logo.png'


const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <nav>
      <div className='logo-container'>
        
        <img
          className='logo'
          src={minimal ? Logo : Logo}
          alt='logo'
        />
      <div className='title'>
      <h1 className='primary-title'></h1>
      <h2 className='second-title'></h2>
      </div>
      </div>

      
      {!authToken && !minimal && (
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
