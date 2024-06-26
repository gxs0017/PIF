import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { AuthContext } from '../components/AuthContext';

const ProfileButton = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
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

  const getInitials = (email) => email.charAt(0).toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="relative">
          <div className={`profile-circle ${getCircleBackgroundColor()}`}>
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full" />
            ) : (
              <span className="text-white">{getInitials(user?.email || '')}</span>
            )}
          </div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="wave-border absolute top-0 left-0 w-full h-full border-2 rounded-full border-white"></div>
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56 bg-white shadow-lg rounded-3xl p-2">
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
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ProfileButton;
