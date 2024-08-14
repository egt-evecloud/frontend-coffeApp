import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import router from "next/dist/shared/lib/router/router";
import { toast, ToastContainer } from "react-toastify";
import Loader from '../../components/layout/loader';
import { Cafe, Empleado,} from '@/interfaces/pedido';


const ModalMostrarDatos: React.FC<ModalProps> = ({
  onClose,
  onOpenModal,
  persona,
  tokenVerificacion,
}) => {
  const router = useRouter();
  const [user_id, setUserID] = useState<number>(0);
  const [documento, setDocumento] = useState<string>("");
  const [nombres, setNombres] = useState<string>("");
  const [appelido_paterno, setApellidoPaterno] = useState<string>("");
  const [apellido_materno, setApellidoMaterno] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [mail_personal, setMailPersonal] = useState<string>("");
  const [mail_institucional, setMailInstitucional] = useState<string>("");
  


  const handleRegistrar = async () => {

  } 
  const handleMensajeExitoso = async () => {
    const mensaje = `Ah registrado de manera exitosa el pedido.`;
    Swal.fire({
      title: "Pedido Guardado",
      html: mensaje,
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#253CA6",
      confirmButtonText: "Salir",
      customClass: {
        cancelButton: `text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600`,
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await actionSendCode();
      }
      if (result.isDismissed) {
        console.log("Redirigiendo a Ingresar Código");
        handleClose();
        onOpenModal(tokenVerificacion);
      }
    });
  };


  const handleClose = async () => {
    await onClose();
  
  useEffect(() => {
    if (persona) {
      setDocumento(persona.documento ?? "");
      setNombres(persona.nombres ?? "");
      setApellidoPaterno(persona.apellido_paterno ?? "");
      setApellidoMaterno(persona.apellido_materno ?? "");
      setMailPersonal(persona.correo_personal ?? "");
      setMailInstitucional(persona.correo_institucional ?? "");
      const user = persona.usuario;
      if (user) {
        setUsername(user.username);
        setUserID(user.id ?? 0);
      }
    
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-xs h-auto m-2">
        <div className="grid grid-cols-6 gap-0 flex justify-between">
          <div className="col-span-2 col-span-6 flex justify-end">
            <button
              onClick={() => {
                handleClose();
              }}
              type="button"
              className="hs-dropdown-toggle !text-[1.5rem] text-[#8c9097] dark:text-white/50/25"
              data-hs-overlay="#formmodalmdo"
            >
              <span className="sr-only">Close</span>
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center mb-4">
          <img
            src={"/assets/iconfonts/grupo_29.svg"}
            alt="Icono"
            className="w-12 h-12"
          />
        </div>
        <h6 className="text-[#FC7E00] text-center font-bold mb-4">
          Datos de la Cuenta
        </h6>
        <div className="text-[#1D2E7F] text-center">
          <p>{nombres?.toUpperCase()}</p>
        </div>
        <div className="text-[#1D2E7F] text-center">
          <p>
            {appelido_paterno?.toUpperCase()} {apellido_materno?.toUpperCase()}
          </p>
        </div>
        <div className="text-[#1D2E7F] text-center">
          <p className="inline">Nombre de usuario: </p>
          <p className="inline font-bold">{username}</p>
        </div>
        <div className="text-[#1D2E7F] text-center">
          <p className="inline">Correos: </p>
          {mail_personal && (
            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
              {mail_personal}
            </p>
          )}
          {mail_institucional && (
            <p className="text-[#8c9097] dark:text-white/50 text-[0.75rem]">
              {mail_institucional}
            </p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            //onClick={handleRegistrar}
            className="ti-btn ti-btn-primary w-full"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalMostrarDatos;
