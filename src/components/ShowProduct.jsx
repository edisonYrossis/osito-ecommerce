import {useState, useEffect, useContext} from 'react'
import {productsContext} from '../context/ProductsContext'
import {UserCartContext} from '../context/UserCartContext'
import {NavLink, useParams} from 'react-router-dom'
import DownNav from './DownNav'
import leftLogo from '../assets/left-arrow.png'
import bigLogo from '../public/big_logo.png'
import linkImg from '../public/link.png'
import copyImg from '../public/copy.png'

function ShowProduct() {
   const {id} = useParams()
   const {productsList, calcPrice, dollarToDom} = useContext(productsContext)

   const {addToCart, cartItems, updateCartItemQuantity} = useContext(UserCartContext)

   const [ price , setPrice ] = useState(0)
   const [ productType , setProductType ] = useState('small')
   const [ productGain , setProductGain ] = useState(10)
   const [ productWeight , setProductWeight ] = useState(0)
   const [selectedProduct, setSelectedProduct] = useState({})
   const [productQuantity, setProductQuantity] = useState(1)
   const [productOptions, setProductOptions] = useState(['algo'])
   const [selectedOption, setSelectedOption] = useState([])
   const [productLink, setProductLink] = useState(null)

  const [initialValueSet, setInitialValueSet] = useState(false)

   useEffect(() => {
    const getProduct = () => {
    const docFounded = productsList.find(doc => doc.id === id )
    setSelectedProduct(docFounded)
    }

    getProduct()
  }, [productsList])


  useEffect(() => {

    if (!selectedProduct) {
        return
    }
     const getProduct = async () => {
          setPrice(selectedProduct.price)
          setProductType(selectedProduct.product_type)
          setProductWeight(selectedProduct.product_weight)
          setProductGain(selectedProduct.product_profit)
          setProductOptions(selectedProduct.options)
          setProductLink(window.location.href)
    }

    getProduct()
  }, [selectedProduct])


  

      useEffect(() => {
        if (!selectedProduct || !selectedProduct.options){
         
          return
        }
    if (!initialValueSet && selectedProduct && selectedProduct.options.length > 0) {
         
          setSelectedOption(selectedProduct.options[0])
          setInitialValueSet(true);
        }
       
      }, [initialValueSet, selectedProduct]);

  

 const newPrice = calcPrice(parseFloat(price), productType, productWeight, productGain)


const handleAddToCart = (p) => {
 
  const isProductAdded = cartItems.some(item => item.product_id === p.id && item.options === selectedOption);
  if (isProductAdded) {
    const confirmed = confirm('Este producto ya está en tu carrito, ¿quieres añadir otro mas?');
    
    if (!confirmed) {
      // El usuario ha cancelado, no hacemos nada
      alert('No se ha añadido :(')
      return;
    }

    // El usuario confirmó, actualizamos la cantidad
    updateCartItemQuantity(p.id, selectedOption, productQuantity);
    alert('Se ha añadido nuevamente :)')
  } else {
    // El producto no está en el carrito, lo añadimos
    addToCart({
      cart_item_id: cartItems.length + p.id,
      product_id: p.id,
      name: p.name,
      description: p.description,
      price:newPrice,
      URL: p.URL,
      options: selectedOption,
      quantity: productQuantity,
      product_link: productLink,
      product_URL : p.product_URL
    });
    alert('Se ha añadido al carrito :)')
  }

}

const handleOptionClick = (e) => {
  setSelectedOption(e)
}

const handleDecreaseQuantity = () => {

    if (productQuantity === 1){
        return
    }
    setProductQuantity(prev => prev - 1)
}

const handleIncreaseQuantity = () => {
    if (productQuantity === 15){
        return
    }
    setProductQuantity(prev => prev + 1)
}

const handleCopyId = () => {
  alert('ID copiado :)')
  navigator.clipboard.writeText(selectedProduct.id)
}

const handleCopyURL = () => {
  alert('Link copiado :)')
  navigator.clipboard.writeText(window.location.href)
}

  return (

    <main className='flex justify-center w-screen '>

    <div className='flex flex-col relative'>

      <section className='flex w-full justify-between items-center h-24 px-4' >
        <NavLink to={'/'} className='flex gap-1 items-center'> <img src={leftLogo} alt="atras" className='w-7 h-7'/> atras </NavLink>


        <span className='flex items-center drop-shadow-xl py-1 px-1'> <img src={bigLogo} alt="left" className='w-32 h-32'/> </span>

        <span className='flex gap-1 items-center text-sm shadow-md rounded-md py-1 px-1' onClick={handleCopyURL}> <img src={linkImg} alt="left" className='w-7 h-7'/> Copiar Link</span>
        
        </section>

<div className='container overflow-y-scroll'>

      <section className='w-full flex justify-center'>
        <img src={selectedProduct.URL} className='w-4/5 md:w-1/2'/>
      </section>
      <section className='flex flex-col justify-start items-start mt-5 mb-4 px-4 w-full'>
       
        <span className='flex justify-between w-full'>

        <h1 className='font-semibold text-2xl mb-1'>{dollarToDom(newPrice)}</h1>
 <span className='flex gap0.5 items-center' onClick={handleCopyId}> <button> <img src={copyImg} alt="copy" className='w-4 h-4 mr-1'/> </button> <h2 className='text-xs'>{selectedProduct.id}</h2></span>
        </span>


          <section className='flex justify-between  mt-6 w-full'>

<span className='flex items-center'>
     <h1 className='font-medium text-lg'>Categoria</h1> <h1 className='font-normal text-base'>{`: ${selectedProduct.product_category}`}</h1>
</span>
    

 <span className='flex w-28 items-center'>
                                <button className='w-8 h-6 bg-black font-semibold text-xs rounded-s-sm text-white' onClick={handleDecreaseQuantity} >-</button>
                                <h1 className='font-semibold text-xs flex-grow'>{productQuantity}</h1>
                                <button className='w-8 h-6 bg-black font-semibold text-xs rounded-e-sm text-white' onClick={handleIncreaseQuantity}>+</button>  
                                </span> 
       </section>

      </section>
       <DownNav />

       
        
       
                             
       <span className='w-5/6 flex px-4'><h2 className='text-sm font-normal text-left'>{selectedProduct.description}</h2></span>



<div className='flex flex-col gap-3 px-4 mt-3 mb-44'>
  <h1 className='font-semibold w-full flex justify-start mb-2'>Selecciona una opcion:</h1>
  <ul className='flex gap-5 flex-wrap'>
    {productOptions && (productOptions.map(option => {
        return <li key={option}>
          <p className={`${ selectedOption == option ? 'bg-gray-300 text-gray-900 border border-black' : 'bg-gray-200 text-gray-700 border border-stone-300'  } w-fit px-3 py-1.5 rounded-full `} onClick={()=> handleOptionClick(option)}>{option}</p>
        </li>
      })
       )}
</ul>
</div>
       
</div>

<div className='fixed bottom-0 w-full flex justify-start md:w-1/2' onClick={() => handleAddToCart(selectedProduct)} >
   <button  className='bg-black text-white py-4 px-24 w-4/5'>Add to Cart</button>
</div>
      
    </div>

</main>
  )
}

export default ShowProduct