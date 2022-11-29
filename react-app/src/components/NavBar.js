
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const currUser = useSelector((state) => state.session.user);
  const userInitial = currUser.username[0].toUpperCase()

  console.log("this is curr user", userInitial)
  return (
    <nav className="navbar-div">
      <ul className="navbar-list-div">
        <li className='navbar-left'>
          <h2>Taskello</h2>
          <span>
            <i className="fa-brands fa-github navbar-icon"></i>
          </span>
          <span>
            <i className="fa-brands fa-linkedin navbar-icon"></i>
          </span>
        </li>
        <li className="navbar-right">
          <p className="user-circle">{userInitial}</p>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
