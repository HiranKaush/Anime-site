import React from 'react';
import "../styles/NavBar.css"

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
