import { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, url }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // Nuevo estado para manejar el éxito

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//         const response = await fetch('http://localhost:2144/api/coffee_order', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: "Juan Perez",
//                 identification: "1234567890",
//                 mail: "juan.perez@example.com",
//                 department: "DIRECCIÓN DE TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES",
//                 position: "ASISTENTE TECNICO DE DESARROLLO DE SISTEMAS DE INFORMACION 1",
//                 coffee: [
//                     { coffee_type: "espresso", quantity: 2 },
//                     { coffee_type: "latte", quantity: 1 }
//                 ]
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Error en la solicitud');
//         }

//         const data = await response.json();
//         setData(data);
//     } catch (error) {
//         console.error('Error al obtener los datos:', error);
//     } finally {
//         setLoading(false);
//     }
// };
const fetchData = async () => {
  setLoading(true);
  // Simulando la respuesta del backend
  const exampleData = {
    name: "Juan Perez",
    identification: "1234567890",
    mail: "juan.perez@example.com",
    department: "DIRECCIÓN DE TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES",
    position: "ASISTENTE TECNICO DE DESARROLLO DE SISTEMAS DE INFORMACION 1",
    coffee: [
      { coffee_type: "espresso", quantity: 2 },
      { coffee_type: "latte", quantity: 1 }
    ]
  };

  // Simular tiempo de respuesta del backend
  setTimeout(() => {
    setData(exampleData);
    setLoading(false);
  }, 1000);
};

  const handleRegister = () => {
    // Aquí puedes hacer la llamada a la API para registrar los datos
    // Simularemos un envío exitoso
    setIsSuccess(true);
    // Puedes hacer un reset del modal después de unos segundos o al cerrarlo
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setData(null);
    }, 2000); // Cierra el modal después de 2 segundos
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg sm:w-2/3 lg:w-1/3">
        {isSuccess ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">¡Datos enviados correctamente!</h2>
          </div>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-bold mb-4">Datos obtenidos de la URL</h2>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <div className="mb-4">
                <p><strong>Nombre:</strong> {data?.name}</p>
                <p><strong>Identificación:</strong> {data?.identification}</p>
                <p><strong>Email:</strong> {data?.mail}</p>
                <p><strong>Departamento:</strong> {data?.department}</p>
                <p><strong>Posición:</strong> {data?.position}</p>
                <h3 className="font-bold mt-4">Cafés solicitados:</h3>
                <ul className="list-disc list-inside">
                  {data?.coffee.map((item, index) => (
                    <li key={index}>
                      {item.coffee_type} - Cantidad: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-3 sm:px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegister}
                className="bg-[#FC7E00] text-white px-3 sm:px-4 py-2 rounded"
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
