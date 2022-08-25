import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const AuthModal = ({ setShowModal, isSignUp }) => {
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [user, setUser] = useState(null);
  console.log(user);
  
  
  let navigate = useNavigate();
  const onInput = e =>
  setUser({ ...user, ...{ [e.target.name]: e.target.value } })

  // console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowModal(false);
  };


  // create user from frontend
  const handleSubmit = async e => {
    e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
    //   if (isSignUp && password !== confirmPassword) {
    //     setError("Passwords need to match!");
    //     return;
    //   }

    const user1 = {
      first_name: "ALI",
      last_name: "MEMM",
      email: "sldjofds@gmail.com",
      password: "122",
      isAdmin: true,
      photo: "src",
      profession: "IT",
      interest: "computer",
      about: "anything",
    };
       user.isAdmin = false;
       //console.log(user);
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

      <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
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
