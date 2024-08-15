"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import { Scanner } from '@yudiel/react-qr-scanner';
import Modal from '@/components/modal/registrar_pedido';
import axios from 'axios';
import { useAuth } from '@/app/authContext';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedUrl, setScannedUrl] = useState('');
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redirige a la página de inicio de sesión si no está autenticado
    }
  }, [token, router]);

  const handleScan = (result: any) => {
    if (result.length > 0) {
      const url = result[0].rawValue;
      console.log(url);

      setScannedUrl(url); // Guardar la URL escaneada en el estado
      setIsModalOpen(true); // Abrir el modal

      // axios.post('http://localhost:5000/api/web_scraping', { url })
      //   .then(response => {
      //     console.log('URL enviada correctamente:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error al enviar la URL:', error);
      //   });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setScannedUrl('');
  };
  if (!token) {
    return null; // O muestra un mensaje de carga si prefieres
  }
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
        {/* <div className="py-6">
          <button
            type="button"
            className="bg-[#FC7E00] text-white text-xl font-bold py-3 px-4 rounded-lg hover:bg-[#FE9900] flex items-center space-x-2"
          >
            Escanear
          </button>
        </div> */}
      </div>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} url={scannedUrl} />
    </div>
  );
};

export default HomePage;
