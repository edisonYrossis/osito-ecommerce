import React from 'react'
import {Link} from 'react-router-dom'

function AdminMenu({menuVisible, setMenuVisible}) {
  return (
   <div className={`fixed top-0 h-screen z-50  w-full ${menuVisible? 'visible' : 'hidden'} flex`}>

    <div className='backdrop-blur-sm w-full flex-grow' onClick={()=> setMenuVisible(false)}></div>

        <div className={`absolute right-0 bg-gray-200 h-screen w-1/2 sm:w-1/3 ${menuVisible? 'visible' : 'hidden'}`}>
            <section className='relative'>
                <button className='absolute text-gray-600 left-5 top-2' onClick={()=> setMenuVisible(false)}>x</button>
            </section>
        
            <ul className='flex flex-col items-start mt-16 gap-5 p-0 px-2'>
            <li className='mb-2'><Link to={'dashboard'}>Dashboard</Link></li>
                <li className='mb-2'><Link to={'productform'}>Crear Producto</Link></li>
                <li className='mb-2'> <Link to={'productedit'}>Buscar/Editar Producto</Link></li>
                <li className='mb-2'><Link to={'productcalculator'}>Calcular Producto</Link></li>
                <li className='mb-2'><Link to={'orders'}>Ordenes</Link></li>
                <li className='mb-2'>Realizar Factura</li>
                <li className='mb-2'>Realizar Recibo</li>
            </ul>
            </div>
   </div> 
  )
}

export default AdminMenu