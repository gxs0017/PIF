import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../styles/Header.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, User } from 'lucide-react';

function Header() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  // Function to determine background color based on initials
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
      <div className="flex justify-between items-center h-20 px-4 relative z-10">
        <div className="flex items-center">
          <Link to="/" className="logo-link">
            PIF
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <div className={`profile-circle cursor-pointer ${getCircleBackgroundColor()}`}>
                  {user.email[0]?.toUpperCase()}
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-56 bg-white shadow-lg rounded-md p-2">
                <DropdownMenu.Label className="px-2 py-1 text-sm font-medium text-gray-700">My Account</DropdownMenu.Label>
                <DropdownMenu.Separator className="border-t border-gray-200 my-1" />
                <DropdownMenu.Item className="px-2 py-1 flex items-center space-x-2 cursor-pointer hover:bg-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  <span>{user.email}</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="border-t border-gray-200 my-1" />
                <DropdownMenu.Item
                  className="px-2 py-1 flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
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
