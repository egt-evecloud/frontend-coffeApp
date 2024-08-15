"use client";
import { useAuth } from '@/app/authContext';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirige al usuario a la página de inicio de sesión
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <p>Coffee App</p>
        </div>
        <div className="hidden md:flex space-x-4 font-bold text-[#1D2E7F]">
          <button onClick={handleLogout} type="button" >
            Cerrar Sesión
          </button>
          <button
            type="button">
            Usuario
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button className="focus:outline-none" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {
        isOpen && (
          <div className="md:hidden">
            <button onClick={handleLogout} className="block px-4 py-2 text-sm font-bold text-[#1D2E7F]">
              Cerrar Sesión
            </button>
            <p className="block px-4 py-2 text-sm font-bold text-[#1D2E7F]">Usuario</p>
          </div>
        )
      }
    </nav >
  );
};

export default Navbar;
