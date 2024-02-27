import React, { useState, useEffect } from 'react';

const Contador = ({ fechaInicio }) => {
  const [dias, setDias] = useState(0);
  const [horas, setHoras] = useState(0);

  useEffect(() => {
    const calcularDiferencia = () => {
      const fechaActual = new Date();
      const fechaInicioObj = new Date(fechaInicio);
      
      // Calcula la diferencia en milisegundos
      const diferenciaEnMilisegundos = fechaInicioObj - fechaActual;

      // Calcula los días y horas
      const diasRestantes = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
      const horasRestantes = Math.floor((diferenciaEnMilisegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    

      // Actualiza el estado
      setDias(diasRestantes);
      setHoras(horasRestantes);
    };

    // Llama a la función inicialmente
    calcularDiferencia();

    // Actualiza el contador cada segundo
    const intervalo = setInterval(calcularDiferencia, 3600000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, [fechaInicio]);

  return (
    <>
    <span className="  w-fit h-fit px-3 py-2.5 rounded-lg drop-shadow-xl ">
 <p  className='text-base font-semibold'>{`${dias > 9 ? dias :`0${dias}`}`}</p>
 <p className='text-xs'>Dias</p>
    </span>
    <span className="  w-fit h-fit px-2 py-2.5 rounded-lg drop-shadow-xl">
         <p className='text-base font-semibold'>{`${horas > 9 ? horas :`0${horas}`}`}</p>
         <p className='text-xs'>Horas</p>
        </span>
      
   
  </>
  );
};

const DaysCounter = () => {
  // Ingresa la fecha de inicio en formato 'YYYY-MM-DDTHH:mm:ss'
  const fechaInicio = '2024-03-02T23:59:59';

  return (
    <div className=" text-black p-8 rounded-lg shadow-xl flex justify-center items-center mx-10">
      <div>
        <h1 className="text-lg font-bold mb-2">Faltan para el pedido: </h1>
        <div className='flex gap-0.5 items-center justify-center'>
        <Contador fechaInicio={fechaInicio} />
        </div>
        
      </div>
    </div>
  );
};

export default DaysCounter;
