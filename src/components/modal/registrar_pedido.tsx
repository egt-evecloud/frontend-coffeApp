import { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, data }) => {
  const [selectedCoffee, setSelectedCoffee] = useState(''); // Estado para el tipo de café seleccionado
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    if (!selectedCoffee) {
      console.error("No se ha seleccionado un tipo de café.");
      return;
    }

    const payload = {
      name: data.full_name,
      identification: data.identification,
      mail: data.institution_email,
      department: data.department,
      position: data.position,
      coffee: [
        {
          coffee_type: selectedCoffee,
          quantity: 1
        }
      ]
    };
    try {
      const response = await axios.post('http://34.86.255.76:5001/api/coffee_order', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.code === "0") {
        console.log('Pedido registrado correctamente:', response.data);
        setIsSuccess(true);
        // setTimeout(() => {
        //   onClose();
        //   setIsSuccess(false); // Resetear el estado de éxito
        // }, 2500);
      } else {
        console.error("Error al registrar el pedido:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg sm:w-2/3 lg:w-1/3">
        {isSuccess ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-green-600 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2l4 -4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-green-600">¡Datos enviados correctamente!</h2>
            <p className="mt-2 text-sm text-green-700">Tu solicitud ha sido procesada con éxito.</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-bold mb-4">Datos obtenidos de la URL</h2>
            <div className="mb-4">
              <p><strong>Nombre:</strong> {data.full_name}</p>
              <p><strong>Identificación:</strong> {data.identification}</p>
              <p><strong>Email:</strong> {data.institution_email}</p>
              <p><strong>Departamento:</strong> {data.department}</p>
              <p><strong>Posición:</strong> {data.position}</p>
              <h3 className="font-bold mt-4">Seleccionar tipo de café:</h3>
              <select
                value={selectedCoffee}
                onChange={(e) => setSelectedCoffee(e.target.value)}
                className="border p-2 rounded w-full mt-2"
              >
                <option value="" disabled>Selecciona un tipo de café</option>
                <option value="espresso">Espresso</option>
                <option value="americano">Americano</option>
                <option value="latte">Latte</option>
                <option value="cappuccino">Cappuccino</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-[#9EA6C8] text-white px-3 sm:px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegister}
                className="bg-[#FC7E00] text-white px-3 sm:px-4 py-2 rounded"
                disabled={!selectedCoffee}
              >
                Registrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
