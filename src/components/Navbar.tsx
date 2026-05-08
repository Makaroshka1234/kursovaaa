import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">⚛</span>
          <span className="logo-text">
            <span className="gradient-text">React</span> Підходи
          </span>
        </NavLink>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="nav-home"
          >
            <span className="nav-link-icon"></span>
            Головна
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="nav-tasks"
          >
            <span className="nav-link-icon"></span>
            Задачі
          </NavLink>
          <NavLink
            to="/comparison"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            id="nav-comparison"
          >
            <span className="nav-link-icon"></span>
            Порівняння
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
