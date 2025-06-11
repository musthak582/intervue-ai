import React from 'react';
import { Link } from 'react-router-dom';
import { FiMic, FiMessageSquare } from 'react-icons/fi';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-100 shadow-sm py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <FiMic className="text-white text-xl" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800 leading-5">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-600">
              InterVue AI
            </span>
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;