import {useContext} from 'react'
import {adminContext} from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'


function Admin() {

    
  const navigate = useNavigate()
    const {
        adminUser,
        setAdminUser,
        adminPass,
        setAdminPass,
        isAdmin
    } = useContext(adminContext)



    const handleSubmit =  (e)=> {
        e.preventDefault() 
      
    isAdmin(adminUser, adminPass)? (
        navigate('/dashboard')
    ) : (
     navigate('/admin')
    )
    }

  return (
    <div className='w-screen  flex place-content-center place-items-center h-4/6'>  


        <form className='w-4/6 h-4/6 shadow-md rounded-sm flex flex-col justify-evenly items-center' onSubmit={handleSubmit}  >
             <h1 className='font-bold text-xl'>Admin</h1> 
                <div className='flex flex-col justify-evenly h-1/4 w-4/6'>

                    
                    <input type="text" placeholder='admin' name='user' className='rounded-md px-2  h-8' onChange={(e)=> setAdminUser(e.target.value)}/>

                    <input type="password" placeholder='******' name='password' className='outline-none rounded-md px-2 h-8' onChange={(e)=> setAdminPass(e.target.value)}/>

                </div>   

                <button type="submit" className='bg-blue-500 rounded-sm text-white px-2 py-1'>Verificar</button>
          
        </form>
    </div>
  )
}

export default Admin