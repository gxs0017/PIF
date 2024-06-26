import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Ensure your Header.css file contains the necessary CSS for the waves animation

function Header() {
  return (
    <header className="text-center bg-white text-gray-800 relative overflow-hidden">
      <div className="flex justify-between items-center h-20 px-4 relative z-10">
        <div className="flex items-center">
          <Link to="/" className="logo-link">
            PIF
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/signin" className="nav-link">Signin</Link>
        </div>
      </div>
      {/* SVG with waves animation */}
      <svg
        className="waves absolute bottom-0 left-0 w-full z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        style={{ height: "25%" }} // Adjusted to cover the lower 25% of the header
      >
        <defs>
          {/* Gradient 1: White to dark pink to blue */}
          <linearGradient id="gradient1" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="#f43c6a" /> {/* Darkened pink color */}
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          {/* Gradient 2: White to cyan green to blue */}
          <linearGradient id="gradient2" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="#2cb67d" /> {/* Cyan green color */}
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          {/* Gradient 3: Cyan to white to blue */}
          <linearGradient id="gradient3" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="cyan" />
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          {/* Waves paths */}
          <path
            id="gentle-wave1"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            fill="url(#gradient1)" // Fill with gradient 1
          />
          <path
            id="gentle-wave2"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            fill="url(#gradient2)" // Fill with gradient 2
          />
          <path
            id="gentle-wave3"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            fill="url(#gradient3)" // Fill with gradient 3
          />
        </defs>
        <g className="parallax">
          {/* Apply waves */}
          <use xlinkHref="#gentle-wave1" x="48" y="0" />
          <use xlinkHref="#gentle-wave2" x="48" y="3" />
          <use xlinkHref="#gentle-wave3" x="48" y="5" />
        </g>
      </svg>
    </header>
  );
}

export default Header;
