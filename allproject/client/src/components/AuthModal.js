import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null)
  // const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [user, setUser] = useState(null)

  console.log(confirmPassword)

  let navigate = useNavigate()
  const onInput = e =>
    setUser({ ...user, ...{ [e.target.name]: e.target.value } })

  const handleClick = () => {
    setShowModal(false)
  }

  // create user from frontend
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      // isSignUp && user &&
      if (user.password !== confirmPassword) {
        console.log('Passwords need to match!')
        setError('Passwords need to match!')
        return
      }

      user.isAdmin = false
      // const response = await axios.post(`http://localhost:8000/users`, user)

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

      <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}

      <form action='submit' onSubmit={e => handleSubmit(e)}>
        <label htmlFor='First Name'>First Name</label>
        <input
          autoFocus
          name='first_name'
          type='text'
          onInput={e => onInput(e)}
        />
        <label htmlFor='Last Name'>Last Name</label>

        <input name='last_name' type='text' onInput={e => onInput(e)} />
        <label htmlFor='email'>Email</label>
        <input name='email' type='text' onInput={e => onInput(e)} />

        <label htmlFor='password'>Password</label>
        <input name='password' type='password' onInput={e => onInput(e)} />
        <label htmlFor='password'>Confirm Password</label>
        <input
          name='confirm password'
          type='password'
          onInput={e => setConfirmPassword(e.target.value)}
        />
        {/* <label htmlFor='photo'>Photo</label>
        <input name='photo' type='text' onInput={e => onInput(e)} /> */}
        {/* <label htmlFor='profession'>Profession</label>
        <input name='profession' type='text' onInput={e => onInput(e)} />
        <label htmlFor='interest'>Interest</label>
        <input name='interest' type='text' onInput={e => onInput(e)} />
        <label htmlFor='about'>About</label>
        <input name='about' type='text' onInput={e => onInput(e)} /> */}

        <button>Submit</button>
      </form>

      <hr />
      <h2>GET THE APP</h2>
    </div>
  )
}
export default AuthModal
