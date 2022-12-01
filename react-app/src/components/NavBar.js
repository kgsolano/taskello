
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const history = useHistory()
  const currUser = useSelector((state) => state.session.user);
  const userInitial = currUser.username[0].toUpperCase()

  const goHome = () => {
    history.push('/workspace')
  } 

  console.log("this is curr user", userInitial)
  return (
    <nav className="navbar-div">
      <ul className="navbar-list-div">
        <li className="navbar-left">
          <h2 className="title-div" onClick={() => goHome()}>
            <img
              className="logo"
              src="https://i.imgur.com/H0CFOXf.png"
              alt="logo"
            />
            Taskello
          </h2>
          <a
            href="https://github.com/kgsolano/taskello"
            className="personal-links"
          >
            <i className="fa-brands fa-github navbar-icon"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/kylesolano/"
            className="personal-links"
          >
            <i className="fa-brands fa-linkedin navbar-icon"></i>
          </a>
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
