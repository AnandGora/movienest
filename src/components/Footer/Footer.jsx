import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-sm">
              MovieNest is your one-stop destination for discovering and
              downloading your favorite movies. Stay entertained with the best
              movie picks!
            </p>
            <p className="text-sm mt-4">
              &copy; {new Date().getFullYear()} MovieNest. All rights reserved.
            </p>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-400 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/all-movies" className="hover:text-gray-100">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link to="/all-movies" className="hover:text-gray-100">
                  Top Picks
                </Link>
              </li>
              <li>
                <Link to="/all-movies" className="hover:text-gray-100">
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-400 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="hover:text-gray-100">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-gray-100">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-100">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-400 mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 text-xl transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 text-xl transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 text-xl transition"
              >
                <FaInstagram />
              </a>
            </div>
            <p className="text-sm mt-4">
              Follow us on social media for the latest updates and movie
              recommendations!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

