import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Youtube', path: '/youtube' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 17px 20px;
          background-color: white;
          border-bottom: 1px solid #eee;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .logo-block {
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1001;
        }

        .logo-image {
          width: 305px;
          height: auto;
          max-width: 100%;
        }

        .logo-text {
          font-family: 'Georgia', serif;
          line-height: 1.2;
        }

        .logo-text h2 {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
          color: #153b5f;
        }

        .logo-text span {
          font-size: 11px;
          color: #666;
          font-style: italic;
          display: block;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .nav-links a {
          text-decoration: none;
          color: #153b5f;
          font-size: 15px;
          font-weight: 500;
          padding: 6px 10px;
          transition: color 0.3s, font-weight 0.3s;
        }

        .nav-links a.active-link {
          color: #ff8c00;
          font-weight: bold;
        }

        .nav-links a:hover {
          color: #ff8c00;
        }

        .contact-btn {
          background-color: #7f3824;
          color: white !important;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: background-color 0.3s;
        }

        .contact-btn.active-link {
          background-color: #1c4973;
          color: white !important;
        }

        .hamburger-menu {
          display: none;
          flex-direction: column;
          cursor: pointer;
          z-index: 1001;
          padding: 5px;
        }

        .hamburger-menu span {
          width: 25px;
          height: 3px;
          background-color: #153b5f;
          margin: 3px 0;
          transition: 0.3s;
        }

        .hamburger-menu.active span:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger-menu.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger-menu.active span:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }

        @media (max-width: 768px) {
          .header {
            padding: 10px 15px;
          }

          .logo-image {
            width: 150px;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: ${isMenuOpen ? '0' : '-100%'};
            width: 250px;
            height: 100vh;
            background-color: white;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 80px 20px 20px 20px;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
            transition: right 0.3s ease;
            z-index: 1000;
            overflow-y: auto;
          }

          .nav-links a {
            width: 100%;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            font-size: 16px;
          }

          .nav-links a:last-child {
            border-bottom: none;
          }

          .contact-btn {
            width: 100%;
            text-align: center;
            margin-top: 20px;
          }

          .hamburger-menu {
            display: flex;
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 999;
            opacity: ${isMenuOpen ? '1' : '0'};
            visibility: ${isMenuOpen ? 'visible' : 'hidden'};
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 8px 12px;
          }

          .logo-image {
            width: 120px;
          }

          .nav-links {
            width: 100%;
            right: ${isMenuOpen ? '0' : '-100%'};
          }
        }
      `}</style>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <header className="header">
        {/* Logo Section */}
        <div className="logo-block">
          <img
            src={logo}
            alt="The Spiritual Journey"
            className="logo-image"
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
        <div className="nav-links">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'active-link' : ''
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `contact-btn${isActive ? ' active-link' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
