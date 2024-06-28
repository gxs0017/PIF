import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { FiSearch } from 'react-icons/fi';
import '../styles/Header.css';

function Header() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
    // Handle your search logic here (navigate, fetch results, etc.)
  };

  const getCircleBackgroundColor = () => {
    const initials = user?.email[0]?.toUpperCase();
    const charCode = initials.charCodeAt(0);
    if (charCode >= 65 && charCode <= 77) {
      return 'bg-red-500';
    } else if (charCode >= 78 && charCode <= 90) {
      return 'bg-cyan-400';
    } else if (charCode >= 97 && charCode <= 109) {
      return 'bg-green-500';
    } else {
      return 'bg-yellow-400';
    }
  };

  return (
    <header className="text-center bg-white text-gray-800 relative overflow-hidden">
      <div className="flex flex-wrap justify-between items-center h-20 px-4 relative z-10">
        <div className="flex items-center space-x-4 flex-grow">
          <Link to="/" className="logo-link">
            PIF
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="search-bar">
            <form className={`search-form ${isSearchOpen ? 'open' : ''}`} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FiSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className={`profile-circle ${getCircleBackgroundColor()} cursor-pointer`} onClick={handleProfileClick}>
                    {user.email[0]}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/signin" className="nav-link">Signin</Link>
          )}
        </div>
      </div>
      <svg
        className="waves absolute bottom-0 left-0 w-full z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        style={{ height: "25%" }}
      >
        <defs>
          <linearGradient id="gradient1" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="#f43c6a" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          <linearGradient id="gradient2" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="#2cb67d" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          <linearGradient id="gradient3" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="cyan" />
            <stop offset="50%" stopColor="white" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          <path
            id="gentle-wave1"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            fill="url(#gradient1)"
          />
          <path
            id="gentle-wave2"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            fill="url(#gradient2)"
          />
          <path
            id="gentle-wave3"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            fill="url(#gradient3)"
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave1" x="48" y="0" />
          <use xlinkHref="#gentle-wave2" x="48" y="3" />
          <use xlinkHref="#gentle-wave3" x="48" y="5" />
        </g>
      </svg>
    </header>
  );
}

export default Header;
