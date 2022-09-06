import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [user, setUser] = useState(null)


  let navigate = useNavigate()

  // @desc    handle all inputs form in one function
  const onInput = e =>
    setUser({ ...user, ...{ [e.target.name]: e.target.value } })

  // @desc    x button will remove form
  const handleClick = () => {
    setShowModal(false)
  }

  // @desc    signup || login user
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (isSignUp && user.password !== confirmPassword) {
        console.log('Passwords need to match!')
        setError('Passwords need to match!')
        return
      }
      // adding isAdmin default = false for every new user
      user.isAdmin = false
      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? 'users' : 'login'}`,
        user
      )
      console.log(response)

      setCookie('AuthToken', response.data.token)
      setCookie('UserId', response.data.userId)

      const success = response.status === 201
      if (success && isSignUp) navigate('/onboarding')
      if (success && !isSignUp) navigate('/dashboard')

      window.location.reload()
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data)
      }
    }
  }

  return (
    <div className='auth-modal'>
      <div className='close-icon' onClick={handleClick}>
        ⓧ
      </div>

      <h2 className="form-title">{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>

      <form action='submit' onSubmit={e => handleSubmit(e)}>
        <label className="form-label" htmlFor='First Name'>First Name</label>
        <input autoFocus name='first_name' type='text' onInput={onInput} />
        <label className="form-label" htmlFor='Last Name'>Last Name</label>

        <input name='last_name' type='text' onInput={onInput} />
        <label className="form-label" htmlFor='email'>Email</label>
        <input name='email' type='text' onInput={onInput} />

        <label className="form-label" htmlFor='password'>Password</label>
        <input name='password' type='password' onInput={onInput} />

        {isSignUp && (
          <>
            <label className="form-label" htmlFor='password'>Confirm Password</label>
            <input
              name='confirm password'
              type='password'
              onInput={e => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        {/* <label htmlFor='photo'>Photo</label>
        <input name='photo' type='text' onInput={onInput} /> */}
        {/* <label htmlFor='profession'>Profession</label>
        <input name='profession' type='text' onInput={onInput} />
        <label htmlFor='interest'>Interest</label>
        <input name='interest' type='text' onInput={onInput} />
        <label htmlFor='about'>About</label>
        <input name='about' type='text' onInput={onInput} /> */}

        <button classname="sumbit-form">Submit</button>
      </form>

      <hr />
      
    </div>
  )
}
export default AuthModal

{
  /* <form onSubmit={handleSubmit}>
      <input
          type="text"
          id="f_name"
          name="first name"
          placeholder="first name"
          required={true}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form> */
}
