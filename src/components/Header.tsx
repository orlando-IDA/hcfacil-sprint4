import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const baseLinkStyle = "relative font-medium transition-colors duration-300 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300";
  const activeLinkStyle = "text-blue-600 font-bold after:w-full";
  const inactiveLinkStyle = "text-gray-600 hover:text-blue-600 after:w-0 hover:after:w-full";

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/home" className="flex items-center">
            <img
              src="/logoHCFacil.png"
              alt="HC Facil Logo"
              className="w-32 h-12 md:w-40 md:h-16 object-contain"
            />
          </NavLink>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-6 lg:gap-8">
              <li>
                <NavLink 
                  to="/sobre" 
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  SOBRE
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/integrantes" 
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  INTEGRANTES
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contato" 
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  CONTATO
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/faq" 
                  className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
                >
                  FAQ
                </NavLink>
              </li>
            </ul>
            
            {user && (
              <NavLink 
                to="/perfil" 
                className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}
              >
                Bem-vindo, {user.nomePaciente.split(' ')[0]}
              </NavLink>
            )}

            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              SAIR
            </button>
          </nav>

          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <ul className="flex flex-col gap-4">
              {user && (
                <li>
                  <NavLink to="/perfil" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                    MEU PERFIL
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/sobre" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  SOBRE
                </NavLink>
              </li>
              <li>
                <NavLink to="/integrantes" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  INTEGRANTES
                </NavLink>
              </li>
              <li>
                <NavLink to="/contato" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  CONTATO
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={({ isActive }) => `block py-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`} onClick={() => setIsMenuOpen(false)}>
                  FAQ
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 w-full px-4 py-2 font-semibold text-red-600 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                  SAIR
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;