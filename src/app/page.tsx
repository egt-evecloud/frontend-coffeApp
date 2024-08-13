import React from 'react';
import Footer from '../components/footer';

const Login = () => {
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
