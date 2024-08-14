"use client";
import React from 'react';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import { Scanner } from '@yudiel/react-qr-scanner';


const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center b-2">
        <div className="font-bold py-6">
          <h1 className="text-4xl test-[#131F56]">Escanear Código Qr</h1>
        </div>
        <div className="grid grid-cols-6 h-1/2 items-center justify-center py-6">
          <div className="col-span-4 col-start-2 bg-[#D9D9D9] p-2 min-w-[300px] min-h-[200px] w-auto h-auto max-h-screen rounded-lg">
            <Scanner  onScan={(result) => console.log(result)} />
            {/* Aquí*/}
          </div>
        </div>
        <div className='py-6'>
          <button
            type="button"
            className="bg-[#FC7E00] text-white text-xl font-bold py-3 px-4 rounded-lg hover:bg-[#FE9900] flex items-center space-x-2">
            Escanear
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
