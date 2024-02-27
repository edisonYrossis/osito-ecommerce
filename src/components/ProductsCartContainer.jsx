import {useContext} from 'react'
import {UserCartContext} from '../context/UserCartContext'
import { NavLink } from 'react-router-dom'

function ProductsCartContainer() {
    const {cartItems, updateCartItemQuantity, removeFromCart, dollarToDom} = useContext(UserCartContext)

    const handleDecreaseQuantity = (itemId, op) => {
      updateCartItemQuantity(itemId,op, -1)
  }
  
  const handleIncreaseQuantity = (itemId, op) => {
    updateCartItemQuantity(itemId, op, 1)
  }
  
  return (
    <ul className='w-full flex justify-start flex-col gap-1'>
    { 
    cartItems.map((item)=> { 
      return  <li className='w-full  h-24 flex justify-between items-center px-2 shadow-md' key={item.cart_item_id}>

            <main className='h-4/5 py-1 flex w-full'>
                        
                         <NavLink to={item.product_link}>

                            <img src={item.URL} alt="imagen" className='w-14 h-full rounded-md shadow-lg'/></NavLink>





                    <div className='flex flex-col justify-between px-3 flex-grow full'>
                        <span className=' text-xs flex justify-between'>
                           <h2 className='text-left'> {item.description}</h2>
                           <button className=' w-5 h-5 text-black text-base ' onClick={()=> removeFromCart(item.cart_item_id)} >x</button>
                            </span>
                        <span className='text-left bg-gray-300
                        opacity-60 rounded-full text-xs font-medium w-fit px-1.5 text-gray-700'>{item.options}</span>

                        <section className='flex justify-between '>


                            <span className='font-semibold text-sm'>{dollarToDom(item.price)}</span> 
                               
                               
                            <span className='flex w-20 items=center'>
                                <button className='w-6 h-5 bg-black font-semibold text-xs rounded-s-full text-white' onClick={()=> handleDecreaseQuantity(item.product_id, item.options)}>-</button>
                                <h1 className='font-semibold text-xs flex-grow'>{item.quantity}</h1>
                                <button className='w-6 h-5 bg-black font-semibold text-xs rounded-e-full text-white' onClick={()=> handleIncreaseQuantity(item.product_id, item.options)}>+</button>  
                                </span> 
                                      
                        </section>
                                         
                       
                       
                    </div>

            </main>
                       
                </li>
    })
    }        
    </ul>
  )
}

export default ProductsCartContainer