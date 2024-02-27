import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import DaysCounter from '../others/DaysCounter'
import whatsappImg from '../assets/whatsapp.png'
import instagramImg from '../assets/instagram.png'


function HomePageMenu({menuVisible, setMenuVisible}) {

    const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const handleVisitAdmin = () => {
    setClickCount((prevCount) => prevCount + 1);

    // Verificar si el contador alcanza 10
    if (clickCount + 1 === 10) {
      // Redirigir al usuario
      navigate('/admin');
    }
  };
  return (
   <div className={`fixed top-0 h-screen z-50  w-full ${menuVisible? 'visible' : 'hidden'} flex`} >

    <div className='backdrop-blur-sm w-full flex-grow' onClick={()=> setMenuVisible(false)}></div>

        <div className={`absolute right-0 bg-gray-200 h-screen w-2/3 md:w-1/3 ${menuVisible ? 'visible' : 'hidden'}`}>
            <section className='relative'>
                <button className='absolute text-gray-600 left-5 top-2' onClick={()=> {setMenuVisible(false)}}>x</button>
            </section>
        
        <div className='flex flex-col h-full justify-between py-24'>
             <ul className='flex flex-col gap-6'>
            <li className='mb-2 font-bold text-lg'><Link to={'/'} className='border-black border-b-4'>Home</Link></li>
               
                <li className='mb-2'>
                    <DaysCounter />
                </li>
            </ul>

            <div className='flex flex-col font-semibold mb-6'>
                <h1 className='mb-3 text-base'>Problema o dudas?</h1>
                <h2 className='mb-4 text-base'>  Contactanos:</h2>
                 <ul className='flex gap-4 justify-center w-full'>
                <li> <a href="https://www.instagram.com/osito.stuff?igsh=MXFyZDdldTI4bnI2bQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className='w-10 h-10'><img src={instagramImg} alt="Instagram" className='w-12 h-12' /></a> </li>
                <li> <a href="https://wa.me/message/GSYRRK3WBVI6C1" target="_blank" rel="noopener noreferrer" className='w-24 h-24'><img src={whatsappImg} alt="Whatsapp" className='w-12 h-12' /></a>  </li>
            </ul>
            </div>

            <div className=' h-5 pointer-events-none' onClick={handleVisitAdmin}>.....</div>
           
        </div>
           
            </div>
   </div> 
  )
}

export default HomePageMenu