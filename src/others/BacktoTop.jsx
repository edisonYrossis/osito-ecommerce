import React, { useEffect, useState } from 'react';
import '../css/Backtotop.css'

const BacktoTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muestra el botón cuando el usuario ha bajado cierta distancia
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    // Scroll suave hacia la parte superior de la página
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
    <section className='fixed bottom-4  w-full flex justify-start z-50 px-4'>

 {showButton && (
        <button
          onClick={handleScrollToTop}
          className=" w-auto  h-10 rounded-full backdrop-blur-md text-gray-600 flex justify-end items-center px-2 py-6 shadow-lg relative"
        >
          <img src='/src/assets/up-arrow.png' className='w-6 h-5 backtotop'/>
        </button>
      )}        
    </section>
    
    </>
     
  );
};

export default BacktoTop;
