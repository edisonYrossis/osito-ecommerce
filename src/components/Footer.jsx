import React from 'react'
import whatsappImg from '../assets/whatsapp.png'
import instagramImg from '../assets/instagram.png'

function Footer() {
  return (
  <div className='relative bottom-0 w-full mt-auto '> 
      <div className='relative flex w-full h-44 text-center'>
        <div className='absolute flex justify-center bottom-3 items-center w-full'>
            <ul className='  flex gap-4'>
                <li> <a href="https://www.instagram.com/osito.stuff?igsh=MXFyZDdldTI4bnI2bQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><img src={instagramImg} alt="Instagram" className='w-8 h-8' /></a> </li>
                <li> <a href="https://wa.me/message/GSYRRK3WBVI6C1" target="_blank" rel="noopener noreferrer" className='w-10 h-10'><img src={whatsappImg} alt="Whatsapp" className='w-8 h-8' /></a>  </li>
               
            </ul>
        </div>
            
      </div>
  </div>
  
  )
}

export default Footer