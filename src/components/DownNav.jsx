import {useEffect,useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {UserCartContext} from '../context/UserCartContext'

function DownNav() {

    const { cartItems } = useContext(UserCartContext)

const handleClick = ()=> {

}

  return (
    <div className='fixed bottom-4  w-full flex justify-end z-50 px-4 md:bottom-8 md:right-4'>
        <NavLink to={'/cart'} className=' w-auto  h-10 rounded-full backdrop-blur-xl text-gray-600 flex justify-end items-center px-2 py-6 shadow-xl relative' onClick={handleClick}>

        <span><img src="/src/assets/shopping-bag.png" alt="Cart" className='w-7 h-7' /></span>
        <span className='bg-black opacity-90 rounded-full w-4 h-4 absolute top-0 right-0 text-gray-200 text-xs flex items-center justify-center p-2'>{cartItems.length}</span>
        </NavLink>
       
    </div>
  )
}

export default DownNav