import { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, url }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(''); // Estado para el tipo de café seleccionado

  useEffect(() => {
    if (url) {
      fetchData();
    } else {
      loadDemoData(); // Cargar datos de demostración si no hay URL
    }
  }, [url]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.code === "0" && result.data) {
        const fetchedData = {
          name: result.data.institution_email.split("@")[0], // Ejemplo para obtener el nombre
          identification: result.data.identification,
          mail: result.data.institution_email,
          department: result.data.department,
          position: result.data.position
        };

        setData(fetchedData);
      } else {
        console.error("Error al obtener los datos:", result);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    setLoading(false);
  };

  const loadDemoData = () => {
    // Datos de demostración
    const demoData = {
      name: "Juan Perez",
      identification: "1234567890",
      mail: "juan.perez@example.com",
      department: "DIRECCIÓN DE TECNOLOGÍA DE LA INFORMACIÓN Y COMUNICACIONES",
      position: "ASISTENTE TECNICO DE DESARROLLO DE SISTEMAS DE INFORMACION 1"
    };
    setData(demoData);
  };

  const handleRegister = async () => {
    if (!selectedCoffee) {
      console.error("No se ha seleccionado un tipo de café.");
      return;
    }

    const payload = {
      ...data,
      coffee: [{ coffee_type: selectedCoffee, quantity: 1 }]
    };
    console.log(payload)
    try {
      const response = await fetch('http://localhost:2144/api/coffee_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error("Error al enviar los datos:", await response.text());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setData(null);
      setSelectedCoffee(''); // Resetea el estado del tipo de café seleccionado
    }, 4000);
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
                disabled={!selectedCoffee} // Deshabilitar si no se selecciona un tipo de café
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
