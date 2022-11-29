import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-page-wrapper">
      <h1>Taskello</h1>
      <form className="signup-form" onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h3>Sign up for your account</h3>
        <div className="login-form-div">
          <input
            className="login-input"
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={updateUsername}
            value={username}
          />
          <input
            className="login-input"
            type="text"
            name="email"
            placeholder="Enter Email"
            onChange={updateEmail}
            value={email}
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={updatePassword}
            value={password}
          />
          <input
            className="login-input"
            type="password"
            name="repeat_password"
            placeholder="Re-enter Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          />
        </div>
        <button className="login-btn" type="submit">
          Sign Up
        </button>
        <Link to="/sign-up" className="sign-up-link">
          <p>Already have an account? Log in</p>
        </Link>
      </form>
      <img
        className="login-pic-left"
        src="https://i.imgur.com/sereUsZ.png"
        alt="login-pic-left"
      />
      <img
        className="login-pic-right"
        src="https://i.imgur.com/Nfq43ZB.png"
        alt="login-pic-right"
      />
    </div>
  );
};

export default SignUpForm;
