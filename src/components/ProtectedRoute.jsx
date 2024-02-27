import {useContext} from 'react'
import {adminContext} from '../context/AdminContext'
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({children, redirectTo = '/admin'}) => {
    const {isAdmin, adminUser, adminPass } = useContext(adminContext)

   if (!isAdmin(adminUser, adminPass)) {return <Navigate to={redirectTo}/>}

   return children ? children : <Outlet />
}

export default ProtectedRoute