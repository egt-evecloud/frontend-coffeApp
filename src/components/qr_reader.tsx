import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'react-qr-reader';

const QrScannerComponent: React.FC = () => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [data, setData] = useState<string | undefined>('No result');

  const handleScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    setData(result?.data);
  };

  const handleScanFail = (err: string | Error) => {
    console.error(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, handleScanSuccess, {
        onDecodeError: handleScanFail,
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        'No se puede acceder a la cámara. Por favor acepta los permisos en el navegador.'
      );
  }, [qrOn]);

  return (
    <div className="grid grid-cols-6 h-1/2 items-center justify-center py-6">
      <div className="col-span-4 col-start-2 bg-[#D9D9D9] p-2 min-w-[300px] min-h-[200px] w-auto h-auto max-h-screen rounded-lg relative">
        {/* QR Scanner Video */}
        <video ref={videoEl} className="w-full h-full"></video>
        <div ref={qrBoxEl} className="absolute inset-0 flex justify-center items-center">
          <img
            src='assets/images/qr-frames.svg'
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>
      </div>

      {/* Mostrar el resultado escaneado si hay */}
      {data && (
        <p className="py-6 text-white">
          Resultado Escaneado: {data}
        </p>
      )}

      <div className="py-6">
        <button
          type="button"
          className="bg-[#FC7E00] text-white text-xl font-bold py-3 px-4 rounded-lg hover:bg-[#FE9900] flex items-center space-x-2"
          onClick={() => {
            if (scanner.current) {
              scanner.current.start();
            }
          }}
        >
          Escanear
        </button>
      </div>
    </div>
  );
};

export default QrScannerComponent;
