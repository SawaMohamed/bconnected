import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


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
    setShowModal(false);
  };


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
        `http://localhost:8000/users`,
        user
      );
      console.log(response);
    //   const response = await axios.post(
    //     `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
    //     { email, password }
    //   );

    //   setCookie("AuthToken", response.data.token);
    //   setCookie("UserId", response.data.userId);

    //   const success = response.status === 201;
    //   if (success && isSignUp) navigate("/onboarding");
    //   if (success && !isSignUp) navigate("/dashboard");

    //   window.location.reload();
    } catch (error) {

      if (error.response.status === 409) {
        alert(error.response.data)
      }

      console.log(error.message);

    }
  };

  return (
    <div className="auth-modal">
     
      <div className="close-icon" onClick={handleClick}>
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
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form> */}

<form action='submit' onSubmit={e => handleSubmit(e)}>
        <label htmlFor='First Name'>First Name</label>
        <input
          autoFocus
          required
          name='first_name'
          type='text'
          onInput={e => onInput(e)}
        />
        <label htmlFor='Last Name'>Last Name</label>

        <input required name='last_name' type='text' onInput={e => onInput(e)} />
        <label htmlFor='email'>Email</label>
        <input required name='email' type='email' onInput={e => onInput(e)} />

        <label htmlFor='password'>Password</label>
        <input
          required
          name='password'
          type='password'
          onInput={e => onInput(e)}
        />
        <label htmlFor='photo'>Photo</label>
        <input
          required
          name='photo'
          type='text'
          onInput={e => onInput(e)}
        />
        <label htmlFor='profession'>Profession</label>
        <input
          required
          name='profession'
          type='text'
          onInput={e => onInput(e)}
        />
        <label htmlFor='interest'>Interest</label>
        <input
          required
          name='interest'
          type='text'
          onInput={e => onInput(e)}
        />
        <label htmlFor='about'>About</label>
        <input
          required
          name='about'
          type='text'
          onInput={e => onInput(e)}
        />
        <button>Submit</button>
      </form> 
      

      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};
export default AuthModal;

