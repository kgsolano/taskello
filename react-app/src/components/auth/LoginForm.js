import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemo = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/workspace' />;
  }

  return (
    <div className="login-page-wrapper">
      <h1>Taskello</h1>
      <form className="login-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h3>Log in to Taskello</h3>
        <div className="login-form-div">
          {/* <label htmlFor='email'>Email</label> */}
          <input
            className="login-input"
            name="email"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={updateEmail}
          />

          {/* <label htmlFor='password'>Password</label> */}
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={updatePassword}
          />
          <br />
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
        <button className="login-btn" onClick={() => loginDemo('demo@aa.io', 'password')}>Log in as Demo User</button>
        <NavLink to="/login" className="sign-up-link">
          <p>Sign up for an account</p>
        </NavLink>
      </form>
      <img className='login-pic-left' src="https://i.imgur.com/sereUsZ.png" alt="login-pic-left" />
      <img className='login-pic-right' src="https://i.imgur.com/Nfq43ZB.png" alt="login-pic-right" />
    </div>
  );
};

export default LoginForm;
