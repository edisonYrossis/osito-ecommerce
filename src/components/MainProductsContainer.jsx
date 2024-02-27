import {useContext, useEffect, useState} from 'react'
import {FaSpinner} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {productsContext} from '../context/ProductsContext'
import ProductCard from './ProductCard'



function MainProductsContainer({query, findProducts }) {

  const navigate = useNavigate()
 const { productsList, calcPrice, dollarToDom } = useContext(productsContext)
 const [loader, setLoader] = useState(true)

useEffect(()=>{
 setLoader(false)
}, [productsList])

    const filteredProducts = findProducts? productsList
    .map((product) => {
      const lowerCaseQuery = query.toLowerCase();
      const keywords = lowerCaseQuery.split(' ');
    
      // Asignar una puntuación al producto basada en cuántas palabras clave coincide
      const score = keywords.reduce((acc, keyword) => {
        if (
          product.description.toLowerCase().includes(keyword) ||
          product.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
          product.options.some((option) => option.toLowerCase().includes(keyword)) ||
          product.name.toLowerCase().includes(keyword) ||  product.product_category.toLowerCase().includes(keyword) ||  product.sub_category.toLowerCase().includes(keyword) ||
          product.id === query ||  product.id.toLowerCase().includes(keyword)
        ) {
          return acc + 1;
        }
        return acc;
      }, 0);
    
      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.product) : productsList
     
    const handleViewProduct = (a)=>{
      navigate(`/product/${a}`)
    }
    


  return (
    <div className=' mx-2 flex justify-center items-center z-10 min-h-4/5'> 
      {loader ? (
        <div className={`flex justify-center items-center h-[calc(100vh-25vh)]`}>
          <FaSpinner className="text-xl text-black opacity-80 animate-spin" />
        </div>
      ) :  <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mx-auto my-auto'>

       
        {filteredProducts.map(product => {
              const newPrice = calcPrice(parseFloat(product.price), product.product_type, product.product_weight, product.product_profit)

              
          return <div key={product.id} onClick={()=> handleViewProduct(product.id) } className='flex justify-center items-center' > <ProductCard key={product.id} img={product.URL} description={product.description} available={product.available} price={dollarToDom(newPrice)} sub_category={product.sub_category} /> </div> 
        }
          
        
        )}

   


    </div> }
    </div>
  
  )
}

export default MainProductsContainer