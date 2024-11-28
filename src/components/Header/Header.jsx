import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
    }
  };

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Movies', slug: '/all-movies', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'Add Movie', slug: '/add-movie', active: authStatus },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Logo width="70px"/>
            </Link>
          </div>

          {/* Navigation Menu */}
          <ul
            className={`lg:flex items-center space-x-6 ${
              isMobileMenuOpen ? 'flex' : 'hidden'
            } lg:space-y-0 space-y-3 flex-col lg:flex-row absolute lg:static bg-black lg:bg-transparent w-full lg:w-auto left-0 lg:left-auto top-full lg:top-auto`}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-full text-white transition-all duration-300 hover:bg-blue-600"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-1"
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white px-3 py-1 focus:outline-none"
            />
            <button
              type="submit"
              className="text-white px-3 py-1 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </nav>

        {/* Search Form for Mobile */}
        <form
          onSubmit={handleSearch}
          className="flex lg:hidden items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-1 mt-3"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white px-3 py-1 focus:outline-none"
          />
          <button
            type="submit"
            className="text-white px-3 py-1 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Search
          </button>
        </form>
      </Container>
    </header>
  );
}

export default Header;


