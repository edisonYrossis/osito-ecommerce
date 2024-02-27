import { useContext, useEffect, useState } from 'react'
import { product_weight_list } from '../data/main_p_weight'
import {calcPrice, dollarToDom} from '../helpers/calculatePrice'
import CalcTable from '../others/CalcTable'
import { productsContext } from '../context/ProductsContext'
import Swal from 'sweetalert2'




function ProductForm() {


const {productsList} = useContext(productsContext)
const [ product , setProduct ] = useState('')  
const [ price , setPrice ] = useState(0)
const [ category , setCategory ] = useState('')
const [ subCategory , setSubCategory ] = useState('')

const [ productType , setProductType ] = useState('small')

const [ productGain , setProductGain ] = useState(10)

const [ productWeight , setProductWeight ] = useState(0)
const [ categoryList , setCategoryList ] = useState([])
const [ subCategoryList , setSubCategoryList ] = useState([])
const [docsList, setDocsList ] = useState('')
const [ productWeightList , setProductWeightList ] = useState([])

const [viewInput, setViewInput] = useState(false)
const [viewSubInput, setViewSubInput] = useState(false)
const [viewWeightInput, setViewWeightInput] = useState(false)
const [viewProductGainInput, setViewProductGainInput] = useState(false)


const handleCategoryChange = (e) => {
 if (e.target.value === 'Otro...') {
  return setViewInput(true)
 }
    setCategory(e.target.value)
    setViewInput(false) 
 }

const handleSubCategoryChange = (e) => {
  if (e.target.value === 'Otro...') {
   return setViewSubInput(true)
  }
     setSubCategory(e.target.value)
     setViewSubInput(false) 
  }
const handleWeightChange = (e) => {
    if (e.target.value === 'Otro...') {
     return setViewWeightInput(true)
    }
       setProductWeight(e.target.value)
       setViewWeightInput(false) 
    }
const handleProductGainChange = (e) => {
      if (e.target.value === 'Otro...') {
       return setViewProductGainInput(true)
      }
         setProductGain(e.target.value)
         setViewProductGainInput(false) 
      }


const handleSubmit = async (e) => {
    e.preventDefault()
   
    if (!product || !price){
      Swal.fire({
        icon: "error",
        title: "Faltan datos",
        text: "Hay campos por llenar",
      });
      return
    }

   try{
    setDocsList(prev => [ ...prev, {
      name: product,
      price: newPrice,
    }])
    Swal.fire({
      title: "Excelente!",
      text: "El producto se agrego :)",
      icon: "success"
    });

   }catch(e){
    Swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "No se pudo agregar el producto :(",
    });
   }
}

const handleClear = (e) => {
  e.preventDefault()

  const clearAll = () => {
      setProduct('')
    setPrice(0),
   setCategory('Ropa')
    setSubCategory('')
    setProductType('small')
   setProductWeight(0)
   setProductGain(10)
  }

 const isTrue = confirm('Deseas limpiar?')

 if(!isTrue){
  return
 }

 clearAll()
  }


useEffect(() => {

  const getDocList = () => {
  
   const categoriesList = new Set()

productsList ? productsList.map(doc => categoriesList.add(doc.product_category) ) : console.log('not found')
    
  const categoriesArray = Array.from(categoriesList)

    setCategoryList(categoriesArray)
   
  }

  getDocList()
}, [productsList])

useEffect(() => {

    const getDocList =  () => {
 
     
   const subCategoriesList = new Set()
  const listFiltered = productsList.filter(doc => doc.product_category === category )

 listFiltered.map( doc => subCategoriesList.add(doc.sub_category))
      
    const subCategoriesArray = Array.from(subCategoriesList)
  
      setSubCategoryList(subCategoriesArray)
 }
  
    getDocList()
}, [category])

useEffect(() => {

  const getDocList = () => {

    const valuesList = product_weight_list

const listFiltered = valuesList.filter( v => v.category === category )

    setProductWeightList(listFiltered)
}

  getDocList()
}, [category])


const newPrice = calcPrice(parseFloat(price), productType, productWeight, productGain)
  return (

  <>
    <div className={`flex md:inline-flex  justify-center items-center mt-7`}>
         <div className='w-5/6 h-5/6 rounded-md flex flex-col justify-evenly items-center p-1'>


         <section className='flex flex-col gap-2 mb-3'> 
        <input type="text" name='product' placeholder='producto' onChange={(e)=>setProduct(e.target.value)} value={product} className='px-2 bg-slate-100 outline-none text-black' />

        <input type="number" name='price' placeholder='precio' step={0.01} onChange={(e)=>setPrice(e.target.value)} value={price} className='px-2 bg-slate-500 outline-none'/>
        </section>
          <div className='flex gap-3'>

       
            
            <section className='flex flex-col gap-8'>
                      <div className={`relative flex flex-col justify-start items-center`}>
 
              <label htmlFor="" className='text-gray-200 font-semibold text-medium'>Categoria</label>
                <select className="border-2 border-gray-300 h-8 pl-2 pr-2 hover:border-gray-400 focus:outline-none appearance-none bg-slate-500 text-gray-200 " onChange={handleCategoryChange} value={category} >

                 {categoryList.map( c => <option value={c} key={c}>{c}</option>)
                } 
                 
                  <option>Otro...</option>
                </select>

                {viewInput && (
                    <input 
                    type='text'
                    placeholder='personalizado'
                    onChange={(e)=>setCategory(e.target.value)}
                    />
                  )  }
          </div>

            <div className={`relative flex flex-col justify-start items-center mb-2`}>
          
                <label htmlFor="" className='text-gray-200 font-semibold text-medium'>Sub Catg.</label>
                <select className="border-2 border-gray-300 h-8 pl-2 pr-2 hover:border-gray-400 focus:outline-none appearance-none bg-slate-500 text-gray-200" onChange={handleSubCategoryChange} value={subCategory} >
                   <option value={''}>elegir</option> 
                {subCategoryList.map( c => <option value={c} key={c}>{c}</option>)
                } 
                  <option>Otro...</option>        
                </select>

                {viewSubInput && (
                    <input 
                    type='text'
                    placeholder='personalizado'
                    onChange={(e)=>setSubCategory(e.target.value)}
                    />
                  )  }

        <section className=' py-3 mt-16'>
             <h1 className='text-white font-semibold text-xl'>{dollarToDom(newPrice)}</h1>
          </section>  

             </div>

             </section>

             <section className='flex flex-col gap-8'>
                  <div className='flex justify-start flex-col'>
                        <label className='text-gray-200 font-semibold text-medium'>Tipo de Producto:</label>
                          <select className="border-2 border-gray-300 h-8 pl-2 pr-2 hover:border-gray-400 focus:outline-none appearance-none bg-slate-500 text-gray-200" onChange={(e)=> setProductType(e.target.value)} value={productType}>
                        <option value={'small'}>p. pequeño</option>
                        <option value={'medium'}>p. mediano</option>
                        <option value={'big'}>p. grande</option>
                      </select>
                    </div>    
                

                  <div className='flex justify-start flex-col'>
                                <label className='text-gray-200 font-semibold text-medium' >Tipo de Peso:</label>
                        <select className="border-2 border-gray-300 h-8 pl-2 pr-2 hover:border-gray-400 focus:outline-none appearance-none bg-slate-500 text-gray-200" onChange={ handleWeightChange} value={productWeight}>

                        <option value={null}>Elegir</option>  
                        {productWeightList.map( v => <option value={v.value} key={v.name}>{v.name}</option>)
                              } 
                          <option>Otro...</option>  
                        </select>

                        {viewWeightInput && (
                                  <input 
                                  type='text'
                                  placeholder='personalizado'
                                  onChange={(e)=>setProductWeight(e.target.value)}
                                  />
                                )  }
                  </div>
                  <div className='flex justify-start flex-col'>
                                <label  className='text-gray-200 font-semibold text-medium'>Margen Ganancia:</label>
                        <select className="border-2 border-gray-300 h-8 pl-2 pr-2 hover:border-gray-400 focus:outline-none appearance-none bg-slate-500 text-gray-200" onChange={ handleProductGainChange} value={productGain}>
                          <option value={10}>10%</option>
                          <option value={15}>15%</option>
                          <option value={20}>20%</option>
                          <option value={25}>25%</option>
                          <option value={30}>30%</option>
                          <option value={35}>35%</option>
                          <option>Otro...</option>  
                        </select>

                        {viewProductGainInput && (
                                  <input 
                                  type='text'
                                  placeholder='personalizado'
                                  onChange={(e)=>setProductGain(e.target.value)}
                                  />
                                )  }
                  </div>

                  </section>
                  
          </div>
         
<span className='flex w-full justify-evenly py-3'>
     <button className="bg-blue-400 text-white rounded-sm p-2" onClick={handleClear} >Limpiar Campos</button>

<button className="bg-black text-white rounded-sm p-2" onClick={handleSubmit} >Guardar</button>
        
</span>
         
    </div>


    </div>

    <div className='mt-28'>
        <CalcTable content={parseFloat(price)} type={productType} weight={productWeight} />
    </div>

    <div className='w-full px-3 py-24 h-fit'>
        <section className='flex justify-between px-1'>
             <h1 className='font-bold text-lg mb-3'>{docsList.length > 1 ? 'Lista de Productos' : 'Lista de Producto'}</h1>
             <section>
                    <button onClick={()=> {
            const formattedList = docsList.map(product => `${product.name} ${dollarToDom(product.price)}`).join('\n');
            const finalText = `Lista de productos:\n${formattedList}`;
            navigator.clipboard.writeText(finalText);
            Swal.fire({
              title: "Excelente!",
              text: "Lista copiada!",
              icon: "success"
            });} } className='ml-2 p-1 bg-black text-white text-sm'>Copiar Lista</button>
                 </section>
        </section>
       
        <ul className='flex flex-col gap-2 '>
            {docsList ?  (docsList.map((doc, index) => <li key={doc.name + doc.price} className='flex justify-between px-4 w-full'>
                <span className='flex justify-between flex-grow px-4'>
                     <h1 className='text-xs font-bold'>{doc.name}</h1>
                     <h2 className='text-xs font-semibold'>{dollarToDom(doc.price)}</h2>
                </span>
                <button className='bg-red-500 text-gray-200 rounded-full w-4 h-4 flex items-center justify-center' onClick={()=> setDocsList(docsList.filter((item, i) => i !== index))}>x</button>
                
           
        </li>)) : 'No hay productos :('
            }
             
        </ul>
      
    </div>
   </>
  )
}

export default ProductForm