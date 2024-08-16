"use client";
import React from 'react';
import Footer from '../components/layout/footer';
import { toast } from 'react-toastify';

const Login = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/google');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (error) {
      toast.error("Sucedió un error al iniciar sesión.")
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center b-2">
      <div className="font-bold py-12">
        <h1 className="text-4xl">Coffe App</h1>
      </div>
      <div className="text-[#131F56] font-bold py-6">
        <h1 className="text-xl">Iniciar Sesión</h1>
      </div>
      <div>
        <button
          type="button"
          className="bg-[#131F56] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#1D2E7F] flex items-center space-x-2"
          onClick={handleLogin}
        >
          <img src="assets/images/google_icon.png" alt="" className="w-8 h-8 object-contain" />
          <span>Iniciar Sesión con Google</span>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
