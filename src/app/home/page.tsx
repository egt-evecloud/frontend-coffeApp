"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/layout/navbar';
import Footer from '../../components/layout/footer';
import { Scanner } from '@yudiel/react-qr-scanner';
import Modal from '@/components/modal/registrar_pedido';
import axios from 'axios';
import { useAuth } from '@/app/authContext';
import { toast, ToastContainer } from 'react-toastify';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [scannedUrl, setScannedUrl] = useState('');
  // const { token } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     router.push('/'); // Redirige a la página de inicio de sesión si no está autenticado
  //   }
  // }, [token, router]);

  const handleScan = (result: any) => {
    if (result.length > 0) {
      const url = result[0].rawValue;
      setScannedUrl(url); // Guardar la URL escaneada en el estado

      axios.post('http://34.86.255.76:5001/api/web_scraping', { url: url })
        .then(response => {
          if (response.data.code === "0" && response.data.data) {
            setData(response.data.data); // Guardar los datos obtenidos en el estado `data`
            setIsModalOpen(true);
            console.log('URL enviada correctamente:', response.data);
          } else {
            console.error("Error en la respuesta de la API:", response.data.message);
          }
        })
        .catch(error => {
          toast('Ocurrió un error al enviar la URL.');
          console.error('Error al enviar la URL:', error);
        });
    }
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
    setScannedUrl('');
  };
  // if (!token) {
  //   return null;
  // }
  return (
    <div>
      <ToastContainer />
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={data} />
    </div>
  );
};

export default HomePage;
