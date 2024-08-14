"use client";
import React from 'react';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';

function handleScan(result:any) {
  if (result.length > 0) {
    const url = result[0].rawValue;
    console.log(url);

    // axios.post('http://localhost:5000/api/web_scraping', { url })
    //   .then(response => {
    //     console.log('URL enviada correctamente:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error al enviar la URL:', error);
    //   });
  }
}

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold py-6">
          <h1 className="text-4xl text-[#131F56]">Escanear Código QR</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Scanner onScan={handleScan} />
        </div>
        <div className="py-6">
          <button
            type="button"
            className="bg-[#FC7E00] text-white text-xl font-bold py-3 px-4 rounded-lg hover:bg-[#FE9900] flex items-center space-x-2"
          >
            Escanear
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
