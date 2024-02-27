import {createContext, useState, useEffect} from 'react'
import {calcPrice, dollarToDom} from '../helpers/calculatePrice'
import {app} from '../database/config'
import {getFirestore, collection, getDocs} from 'firebase/firestore'

export const productsContext = createContext()

export function ProductsContextProvider({children}) {
    
    const [filter, setFilter] = useState('todos');

    const [productsList, setProductList] = useState([])

    useEffect(() => {
        const getDocList = async () => {
            const db = getFirestore(app)  
            const collectionref = collection(db, 'productos')
        
            const querySnapshot = await getDocs(collectionref)
        
            const allProductsArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        
           setProductList(allProductsArray)
        };

    
        getDocList();
      }, []);

const val = {
    productsList,
    setProductList,
    filter,
    setFilter,
    calcPrice,
    dollarToDom
 }

 return <productsContext.Provider value={val}>
    {children}
 </productsContext.Provider>
}