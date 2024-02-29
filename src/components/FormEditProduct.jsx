import { useEffect, useState , useContext} from 'react'
import {productsContext} from '../context/ProductsContext'
import {app} from '../database/config'
import {getFirestore, collection, updateDoc, doc} from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import ProductTags from '../components/ProductTags'
import ProductOptions from '../components/ProductOptions'
import { product_weight_list } from '../data/main_p_weight'
import ProductCard from '../components/ProductCard'
import {calcPrice, dollarToDom} from '../helpers/calculatePrice'
import Swal from 'sweetalert2';


function FormEditProduct({}) {

const {id} = useParams()
const {productsList} = useContext(productsContext)

const [selectedProduct, setSelectedProduct] = useState({})
const [ product , setProduct ] = useState('')  
const [ price , setPrice ] = useState(0)
const [ category , setCategory ] = useState('')
const [ subCategory , setSubCategory ] = useState('')
const [ description , setDescription ] = useState('')
const [ available , setAvailable ] = useState(true)
const [ fileURL , setFileURL ] = useState('')
const [ productType , setProductType ] = useState('small')
const [ productURL , setProductURL ] = useState('') 
const [ productGain , setProductGain ] = useState(10)
const [productOptions, setProductOptions] = useState([])
const [productTags, setProductTags] = useState([])
const [ productWeight , setProductWeight ] = useState(0)


const [ newProduct , setNewProduct ] = useState( {
  name: '',
  price: 0,
  description: '',
  URL: '',
  product_category: '',
  sub_category: '',
  available: true,
  tags: [],
  options: [],
  product_type: '',
  product_URL: '',
  product_weight: 0,
  product_profit: 10
  } )
const [ categoryList , setCategoryList ] = useState([])
const [ subCategoryList , setSubCategoryList ] = useState([])
const [ productWeightList , setProductWeightList ] = useState([])
const [viewInput, setViewInput] = useState(false)
const [viewSubInput, setViewSubInput] = useState(false)
const [viewWeightInput, setViewWeightInput] = useState(false)
const [viewProductGainInput, setViewProductGainInput] = useState(false)
const [handleUpdateBtn, setHandleUpdateBtn] = useState(false)

 const fileHandler = async (e) => { 

    const file = e.target.files[0]
    const storageref = app.storage().ref()
    const filepath = storageref.child(file.name)
    await filepath.put(file)
    const fileurl = await filepath.getDownloadURL().then( res => setFileURL(res))
 }


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

      const handleUpdate = async (e) => {
        e.preventDefault()
       
      const getProduct = () => {
      setNewProduct(
          {
          name: product,
          price: price,
          description: description,
          URL: fileURL,
          product_category: category,
          sub_category: subCategory,
          available: available,
          tags: productTags,
          options: productOptions,
          product_type: productType,
          product_URL: productURL,
          product_weight: productWeight,
          product_profit: productGain
          }) 
          setHandleUpdateBtn(true)
  }

  getProduct()
   
    }

    const handleClear = (e) => {
      e.preventDefault()
    
      const clearAll = () => {
          setProduct('')
        setPrice(0),
        setDescription('')
        setFileURL('')
       setCategory('Ropa')
        setSubCategory('')
        setAvailable(true)
        setProductTags([])
        setProductOptions([])
        setProductType('small')
        setProductURL('')
       setProductWeight(0)
       setProductGain(10)
      }
    
     const isTrue = confirm('Deseas limpiar?')
    
     if(!isTrue){
      return
     }
    
     clearAll()
      }

 const setItems = (e)=> {
        e.preventDefault()
            const values = ()=>{
                if(category == 'Ropa'){
                  return ['XS','S','M','L','XL','2XL','3XL']
                }
                if (subCategory === 'Covers'){
                  return ['IPHONE 7/8 PLUS', 'iphone X/XS','IPHONE XS MAX','IPHONE XR','IPHONE 11','IPHONE 11 PRO','IPHONE 11 PRO MAX','IPHONE 12','IPHONE 12 PRO','IPHONE 12 PRO MAX','IPHONE 13','IPHONE 13 PRO MAX','SAMSUNG','GALAXY A','XIAOMI','REDMI', 'OTRO']
                }
                return ['algo']
            }
        
            setProductOptions(values)
          }



  useEffect( ()=> {
            if(productURL === ''){
              return
            }
            const trimTextBeforeURL = (t) =>  {
      
              if (t) {
                const regex = /(http[s]?:\/\/[^\s]+)/;
                const match = t.match(regex);
            
                return match ? match[0] : t;
              } else {
                return t;
              }
          }

        const newText =  trimTextBeforeURL(productURL)
        setProductURL(newText)

          }, [productURL])
     
          

    useEffect(() => {
      

      if(!handleUpdateBtn){
        return; 
      }
      
      if(!product || !price || !description || !fileURL || !productURL) {
        return;
      }
      
      const updateProduct = async () => {
       
        try {
          const db = getFirestore(app);
          const collectionRef = collection(db, 'productos');
          const productRef = doc(collectionRef, id);
     
           // Realizar una actualización utilizando el método update
         await updateDoc(productRef, newProduct);
        
         Swal.fire({
          title: "Supeeeer!",
          text: "Producto actualizado satisfactoriamente ;)",
          icon: "success"
        })

        setHandleUpdateBtn(false)
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Ocurrio un error.",
            text: error.message,
          });
        }
        
        
      };
    
      // Llamar a la función de actualización cuando newProduct cambie
    
  if(handleUpdateBtn){
    updateProduct();
  }
  
    

    }, [newProduct]);

useEffect(() => {
    const getProduct = async () => {
    const docFounded = productsList.find(doc => doc.id === id )
    setSelectedProduct(docFounded)
    }

    getProduct()
  }, [productsList])



  useEffect(() => {
    const getProduct = () => {
if(selectedProduct) {
    setProduct(selectedProduct.name ? selectedProduct.name : '')
    setPrice(selectedProduct.price ? selectedProduct.price : 0)
    setCategory(selectedProduct.product_category ? selectedProduct.product_category : '')
    setSubCategory(selectedProduct.sub_category ? selectedProduct.sub_category: '')
    setDescription(selectedProduct.description ? selectedProduct.description : '')
setProductTags(selectedProduct.tags ? selectedProduct.tags : ['algo'])
setProductOptions(selectedProduct.options ? selectedProduct.options : ['algo'])
    setAvailable(selectedProduct.available ? selectedProduct.available : false)
    setFileURL(selectedProduct.URL ? selectedProduct.URL : '')
    setProductURL(selectedProduct.product_URL)
    setProductType(selectedProduct.product_type ? selectedProduct.product_type : 'small')
    setProductWeight(selectedProduct.product_weight ? selectedProduct.product_weight : 0)
    setProductGain(selectedProduct.product_profit ? selectedProduct.product_profit : 10)
}   
    }

    getProduct()
  }, [selectedProduct])

useEffect(() => {

  const getDocList = async () => {
  
    const allProducts = await productsList
   const categoriesList = new Set()

allProducts ? allProducts.map(doc => categoriesList.add(doc.product_category) ) : console.log('not found')
    
  const categoriesArray = Array.from(categoriesList)

    setCategoryList(categoriesArray)
    
   
  }

  getDocList()
}, [productsList])

useEffect(() => {

    const getDocList = async () => {
 
      const allProducts = await productsList

     
   const subCategoriesList = new Set()
  const listFiltered = allProducts.filter(doc => doc.product_category === category )

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
      <div className={`h-5/6 w-full md:w-3/4 flex md:inline-flex  justify-center items-center `}>
    <div className='w-5/6 h-5/6 shadow-md rounded-md flex flex-col justify-evenly items-center p-1'>
       
         <h1 className='w-full font-bold text-base text-red-600 mt-6'>Formulario Producto</h1>

        <form action="" className="grid grid-cols-2 items-center gap-3 justify-evenly h-4/5 ">

           <div className='flex flex-col gap-2'>
            
                      <input type="text" name='product' placeholder='producto' onChange={(e)=>setProduct(e.target.value)} value={product}/>

                      <input type="number" name='price' placeholder='precio' step={0.01} onChange={(e)=>setPrice(e.target.value)} value={price}/>

                      <input type="textarea" name='description' placeholder='descripcion ' onChange={(e)=> setDescription(e.target.value)} value={description}/>
 
            
                      <div className={`relative flex ${viewInput? 'flex-col' : 'flex-row'} justify-start items-center`}>
 
              <label htmlFor="">Categoria</label>
                <select className="border-2 border-gray-300 text-gray-700 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={handleCategoryChange} value={category} >

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

            <div className={`relative flex ${viewSubInput? 'flex-col' : 'flex-row'} justify-start items-center mb-2`}>
          
                <label htmlFor="">Sub Catg.</label>
                <select className="border-2 border-gray-300 text-gray-700 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={handleSubCategoryChange} value={subCategory} >
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

             </div>

                  <div className='flex justify-start'>
                        <label>Tipo de Producto:</label>
                          <select className="border-2 border-gray-300 text-gray-700 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={(e)=> setProductType(e.target.value)} value={productType}>
                        <option value={'small'}>p. pequeño</option>
                        <option value={'medium'}>p. mediano</option>
                        <option value={'big'}>p. grande</option>
                      </select>
                    </div>    
                

                  <div className='flex justify-start'>
                                <label >Tipo de Peso:</label>
                        <select className="border-2 border-gray-300 text-gray-700 h-10 pl-5 pr-5 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={ handleWeightChange} value={productWeight}>

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
                  <div className='flex justify-start'>
                                <label >Margen Ganancia:</label>
                        <select className="border-2 border-gray-300 text-gray-700 h-8 pl-5  bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={ handleProductGainChange} value={productGain}>
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

                  <div className="relative inline-flex justify-start items-center">
                    
                    <select className="border-2 border-gray-300 text-gray-700 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" onChange={(e)=> setAvailable(e.target.value)} value={available}>
                      <option value={true}>Disponible 🟢</option>
                      <option value={false}>No disponible 🔴</option>
                    </select>
                 </div>

          </div>

        

          
          <div className='flex flex-col gap-2'>
            
              <ProductTags productTags={productTags} setProductTags={setProductTags}/>

              <div>
                  <ProductOptions productOptions={productOptions} setProductOptions={setProductOptions}/>
                   <button onClick={setItems} className={`ml-2 p-1 bg-black text-white`}>
                    {category == 'Ropa' ? 'Size' : subCategory == 'Covers' ? 'Moviles' : 'Elige'}
                  </button>
              </div>

            


                 <div className='flex flex-col mt-4'>
                
             <input type="file" onChange={fileHandler}  className="mt-2 mb-2 p-2 focus:outline-none"/>
             
              <label>Producto IMG URL</label>
                 <section>
                    <input type="textarea" value={fileURL} onChange={(e)=> setFileURL(e.target.value)}
                    />
                    <button onClick={()=> navigator.clipboard.writeText(fileURL) } className='ml-2 p-1 bg-black text-white'>copiar</button>
                 </section>
                </div>
           



            <div className='flex flex-col mt-4'>
                <label>URL Producto</label>
              
                <section >
                  <textarea type="text" name='productURL' placeholder='URL del producto' onChange={(e)=>setProductURL(e.target.value)} value={productURL} className='h-24 md:h-16 w-full text-xs resize-none focus:outline-none overflow-hidden'/>
                  <button onClick={()=> navigator.clipboard.writeText(productURL) } className='ml-2 p-1 bg-black text-white'>copiar</button>
              </section>

              </div>
            </div>
         
           <button className="bg-blue-400 text-white rounded-sm p-2" onClick={handleClear} >Limpiar Campos</button>

          <button className="bg-black text-white rounded-sm p-2" onClick={(e) => handleUpdate(e)} >Guardar</button>

        
            < br />
        </form>
    </div>


    </div>
      <div className='h-screen w-full flex md:w-1/4 md:flex-grow md:inline-flex md:h-5/6 md:place-content-start place-content-center place-items-center'>

      <ProductCard key={product} img={fileURL} description={description} available={available} price={dollarToDom(newPrice)} sub_category={subCategory} />
      </div>
   </>
  )
}

export default FormEditProduct