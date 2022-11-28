import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './splash.css'

function SplashPage() {
  return (
    <div className="splash-page-wrapper">
      <div className="splash-navbar">
        <h1>Taskello</h1>
        <div className="login-wrapper">
          <NavLink className="login-link" exact to="/login">
            <p>Login</p>
          </NavLink>
          <NavLink className="signup-link" exact to="/sign-up">
            <p className='signup-text'>Sign Up</p>
          </NavLink>
        </div>
      </div>
      <div className='splash-main-content'>
        <div className="splash-header-wrapper">
            <h1>Taskello brings all your tasks, teammates, and tools together</h1>
            <p>Keep everything in the same place—even if your team isn’t.</p>
            <Link to='/sign-up' className='signup-btn'>Sign up - it's free!</Link>
        </div>
        <img className='splash-img' src="https://i.imgur.com/L7t1qoA.png" alt="splash-img" />
    </div>
    </div>
  );
}

export default SplashPage