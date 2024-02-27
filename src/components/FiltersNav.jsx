// Navbar.js
import {useContext, useEffect, useState} from 'react'
import {productsContext} from '../context/ProductsContext.jsx'


const FilterNav = ({setQuery, setFindProducts, searchQuery}) => {
 const { productsList } = useContext(productsContext)
 const [categories, setCategories] = useState([])

 useEffect(()=> {
     // Utiliza un conjunto para almacenar categorías únicas
     const uniqueCategories = new Set(productsList.map((product) => product.product_category));

     // Convierte el conjunto de nuevo a un array
     const uniqueCategoriesArray = Array.from(uniqueCategories);
 
     // Actualiza el estado con las categorías únicas
    setCategories(uniqueCategoriesArray)

 }, [productsList])


  return (
    <nav className="bg-transparent p-4 w-screen overflow-scroll">
      <div className="flex items-center  justify-between">
        {/* Botones en los lados */}
       

              {/* Filtros deslizables para móvil */}
              <div className=" flex flex-grow ">
               
              
                  <div className="flex w-full justify-around ">
                    {/* Contenido de los filtros */}
                    <button
              className={`text-black inline-block ${
                searchQuery == '' ? 'bg-gray-400 opacity-60' : 'bg-gray-200 opacity-60'
              } rounded flex-grow px-3 py-1 text-lg font-bold mr-2 transition-all`}
              onClick={() => setQuery('')}
            >Todos </button>
               
                    {categories.map((c) => (
              <button
                key={c}
                className={`text-black inline-block ${
                  searchQuery == c ? 'bg-gray-400 opacity-60' : 'bg-gray-200 opacity-60'
                } rounded flex-grow px-3 py-1 text-lg font-bold mr-2 transition-all`}
                onClick={() => {
                   setQuery(c)
                   setFindProducts(true)
                }
                 }
              >
                {c}
              </button>
            ))}
                    
                    {/* ... Agrega más filtros según sea necesario */}
                  </div>
            
              </div>
      </div>
    </nav>
  );
};

export default FilterNav;
