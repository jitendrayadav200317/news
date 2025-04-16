import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, TextInput } from '@mantine/core';
import { X, Menu, Bell, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProfileDropDown from './ProfileDropDown';
import LiveSearch from './LiveSearch';

function Navbar() {
  const { authenticated } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-opacity-80 bg-white h-14 border-b border-b-gray-200 backdrop-blur-md p-4 text-black sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4 relative">
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold ml-2"
        >
          NewsAI
        </motion.h1>

        <div className="w-1/3">
          <LiveSearch />
        </div>

        <div className="flex items-center gap-6">
          {authenticated && (
            <ul className="hidden md:flex space-x-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'News', path: '/news' },
                { name: 'World', path: '/world' },
                { name: 'About', path: '/about' },
              ].map((item) => (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  key={item.name}
                  className="hover:text-gray-700 text-sm"
                >
                  <Link
                    className="text-md font-semibold tracking-wider"
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}

          {authenticated ? (
            <div className="flex items-center gap-4">
              <button className="relative text-gray-600 hover:text-gray-800">
                <Bell size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  3
                </span>
              </button>
              <ProfileDropDown />
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hidden md:block">
                <Button variant="white" size="xs">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button variant="white" size="xs">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            onClick={handleClick}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white p-4 shadow-md rounded-lg mx-4 mt-2"
        >
          <ul className="space-y-4 text-center">
            {[
              { name: 'Home', path: '/' },
              { name: 'Categories', path: '/categories' },
              { name: 'Channels', path: '/channels' },
              { name: 'About', path: '/about' },
            ].map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <Link to={item.path} className="block hover:text-gray-700">
                  {item.name}
                </Link>
              </motion.li>
            ))}
            <li>
              <Link to="/login" className="block hover:text-gray-700">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="block hover:text-gray-700">
                Register
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
