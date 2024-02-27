import {useContext} from 'react'
import {adminContext} from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import '../css/Nav.css'

function Nav({setMenuVisible}) {

    const {adminUser} = useContext(adminContext)
  return (
    <div className='w-screen px-3 py-1 sticky top-0 bg-page z-30'>

    <ul className='flex justify-between items-center '>

        <li className=' flex justify-start relative logo-container '>
          <NavLink to='/' className='flex justify-start 'style={{ textDecoration: 'none', textRendering: 'optimizeLegibility' }}>     <img src='/src/assets/stuff_logo.png' className='w-2/4 '/>  </NavLink></li>

          <li className='flex place-content-start flex-grow '>
            <h1 className='font-semibold'>Pagina Administracion</h1>
                    </li>


                    <li onClick={()=> setMenuVisible(true)} > <img src='/src/assets/menuBar.png' className='w-11 h-11'/>
                    </li>

                </ul>
            
                </div>

      
  )
}

export default Nav