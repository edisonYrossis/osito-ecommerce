import {useContext} from 'react'
import {UserCartContext} from '../context/UserCartContext'
import {NavLink, useNavigate} from 'react-router-dom'
import ProductsCartContainer from '../components/ProductsCartContainer'

function UserCart() {

   const navigate = useNavigate()
    const { totalAmount, dollarToDom } = useContext(UserCartContext)
      


  return (
    <>

     <div className='flex flex-col h-dvh'>

        <section className='w-screen px-3 py-1 bg-page z-30  border-b border-black'>
            <ul className='flex justify-between items-center'>
                <li className=' flex justify-start relative logo-container '>
                <NavLink to='/' className='flex justify-start 'style={{ textDecoration: 'none', textRendering: 'optimizeLegibility' }}>     <img src='src/assets/stuff_logo.png'/>  </NavLink></li>
                    <li className='flex flex-grow justify-start '><h1 className='font-bold text-lg'>Tu Orden</h1></li>
                    <li className=' flex justify-start relative '>
                <img src='src/assets/shopping-bag.png' className='w-10 h-10 '/>  </li>
                </ul>
        </section>


        <section className='flex-grow flex justify-start items-start p-3 overflow-scroll'>
    

             <ProductsCartContainer />

        </section>


        <section className='w-full h-16 px-3 py-2 bg-page z-30  border-t border-black'>
            <ul className='flex justify-between items-center'>
               
                    <li className='flex flex-grow justify-start'><h1 className='font-bold text-xl'>Subtotal</h1><h1 className='font-semibold text-lg'>{`: ${dollarToDom(totalAmount)}`}</h1></li>

                    <li className=' flex justify-start relative pt-1 items-center'>
           
                 <button className='bg-black px-2 py-2 rounded-sm text-white font-semibold mb-2' onClick={()=> navigate('/confirmorder')}>Confirmar Orden</button>  </li>
                </ul>
        </section>
       


     </div>
    </>
   
  )
}

export default UserCart