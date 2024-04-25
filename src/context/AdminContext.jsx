
import {createContext, useState} from 'react'

export const adminContext = createContext()

export function AdminContextProvider({children}) {
   
    const [adminUser, setAdminUser ] = useState('')
    const [adminPass, setAdminPass ] = useState('') 
    const [isAllowed, setIsAllowed ] = useState(false) 

    const admins = [{
        admin: 'edison',
        password: 'edison20051234'
    },
    {
        admin: 'naomi',
        password: 'pintura'
    },
    {
        admin: 'user01',
        password: '2022'
    }]

    const isAdmin = (adm, pass) =>  {
        const foundedAdmin = admins.find(u => {
            return u.admin === adm && u.password === pass
        })
        foundedAdmin ? setIsAllowed(true) : setIsAllowed(false)
        

        return !!foundedAdmin
    }

    
    

    const val = {
        adminUser,
        setAdminUser,
        adminPass,
        setAdminPass,
        admins,
        isAdmin,
        isAllowed,
    }

    return <adminContext.Provider value={val}>
        {children}
    </adminContext.Provider> 
}