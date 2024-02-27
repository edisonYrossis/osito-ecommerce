import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import AdminMenu from '../components/AdminMenu'



function AdminDashboard() {

    const [menuVisible, setMenuVisible] = useState(false)

    
  return (
 
    <div className=' h-dvh relative'>


       <AdminNav setMenuVisible={setMenuVisible} />

        <AdminMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>

        <div className='h-screen md:flex'>
           <Outlet />
        </div>
       
        
        
    </div>
  )
}

export default AdminDashboard