import React, { useState, useContext, useEffect, useMemo } from 'react';
import {productsContext} from '../context/ProductsContext'
import SearchBar from '../components/SearchBarEdit'
import {app} from '../database/config'
import { getFirestore, deleteDoc, doc, collection } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage';
import BackToTop from '../others/BacktoTop'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


// Asegúrate de importar tu componente de carga de imágenes si lo necesitas

const ProductEdit = () => {
const { productsList, calcPrice , dollarToDom } = useContext(productsContext)
const [query, setQuery] = useState('')
const [findProducts, setFindProducts ] = useState(false)
const navigate = useNavigate()


const filteredProducts = findProducts? productsList.map((product) => {
  const lowerCaseQuery = query.toLowerCase();
  const keywords = lowerCaseQuery.split(' ');

  // Asignar una puntuación al producto basada en cuántas palabras clave coincide
  const score = keywords.reduce((acc, keyword) => {
    if (
      product.description.toLowerCase().includes(keyword) ||
      product.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
      product.options.some((option) => option.toLowerCase().includes(keyword)) ||
      product.name.toLowerCase().includes(keyword) || 
      product.id === query || product.id.toLowerCase().includes(keyword)
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return { product, score };
})
.sort((a, b) => b.score - a.score)
.map((entry) => entry.product) : productsList
 


const handleDelete = async (a) => {

  const deleteProduct = async () => {   
      const db = getFirestore(app);
      const collectionRef = collection(db, 'productos');
      const productRef = doc(collectionRef, a);
 
const product_imgURL = productsList.find(doc => doc.id === a).URL

      deleteDoc(productRef)
       .then(() => {
         alert('Documento eliminado exitosamente. Recarga la pagina');
      })
      .catch((error) => {
       alert('Error al intentar eliminar el documento:', error.message);
      });}


      // Verificar si la contraseña es correcta (puedes compararla con una contraseña predefinida)
     
     
  const isTrue = confirm('Deseas eliminar para siempre? :(')
  
  if(isTrue){
    deleteProduct()
  }
  if (!isTrue) {
   alert('Operacion cancelada')
  }
    }


        const handleEdit = (a) => {
         window.open(`/dashboard/productedit/${a}`, '_blank');

        }

   

  // Puedes agregar más campos de entrada y lógica de manejo de estado según sea necesario

  return (
    <div className='w-full relative'>
      <h2 className='font-bold text-2xl'>Buscar/Editar Producto</h2>
      <div className='flex flex-grow w-full items-center justify-center mb-12'>
         <SearchBar searchQuery={query} setQuery={setQuery} SearchPlaceholder={'Buscar ID o Producto...'} findProducts={findProducts} setFindProducts={setFindProducts} />
      </div>
     
     <BackToTop />
    

      <ul className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-3" >
      {filteredProducts.map((doc) => (

        <li key={doc.id} className="bg-white p-4 rounded-md shadow-md ">
         
         <section className='w-full flex justify-between '>
        <img
            src={doc.URL}
            alt={doc.name}
            className="w-32 h-32 object-cover mb-2 rounded-md overflow-hidden"
          />
          <ul className='flex flex-col gap-1 items-end justify-start'>
            <li>  <span className="inline-block bg-gray-200 opacity-60 rounded-full px-3 py-1 text-xs font-bold text-gray-700 mr-2"  >{doc.product_category} </span></li>
            <li>  <span className="inline-block bg-gray-200 opacity-60 rounded-full px-3 py-1 text-xs font-bold text-gray-700 mr-2"  >{doc.sub_category} </span></li>
            <li>  <span className="inline-block bg-gray-200 opacity-60 rounded-full px-3 py-1 text-xs font-bold text-gray-700 mr-2"  >{doc.product_type} </span></li>
            <li>  <span className="inline-block bg-gray-200 opacity-60 rounded-full px-3 py-1 text-xs font-bold text-gray-700 mr-2"  >{doc.product_weight + 'lb'} </span></li>
            <li>  <span className="inline-block bg-gray-200 opacity-60 rounded-full px-3 py-1 text-xs font-bold text-gray-900 mr-2"  >${doc.price} </span></li>
            <li>  <span className="inline-block bg-green-200 opacity-60 rounded-full px-3 py-1 text-xs font-bold text-gray-700 mr-2"  >{doc.product_profit + '%'} </span></li>
          </ul>
         </section>
         
          <h3 className="text-lg font-semibold mb-2">{doc.name}</h3>

          <section className='w-full flex justify-between mb-2'>
          
          <span className="inline-block opacity-60 rounded-full px-2 py-2 text-xs font-bold text-gray-700 mr-2"  >{dollarToDom(calcPrice(parseFloat(doc.price), doc.product_type, doc.product_weight, doc.product_profit))} </span>

          <ul className='flex'>
          <li>  <span className={`${  doc.tags.length == 0 ? 'bg-red-400' : doc.tags.length >= 1 && doc.tags.length <= 5 ? 'bg-red-100' :
    doc.tags.length >= 6 && doc.tags.length <= 9 ? 'bg-yellow-200' :
    doc.tags.length >= 10 ? 'bg-green-200' : 'bg-gray-200'} inline-block opacity-60 rounded-full px-1 py-1 text-xs font-bold text-gray-700 mr-1`}  >{'tags'} </span></li>

          <li>  <span className={`${  doc.options.length == 0 ? 'bg-red-400' : doc.options.length >= 1 && doc.options.length <= 3 ? 'bg-yellow-100' : doc.options.length >= 4 ? 'bg-green-200' : 'bg-gray-200'} inline-block opacity-60 rounded-full px-1 py-1 text-xs font-bold text-gray-700 mr-2`}  >{'Opciones'} </span></li>
          </ul>

    
        
          </section>
         
          <div className="flex space-x-2">
         
          <a
                href={doc.product_URL}
                target="_blank"
                rel="noopener noreferrer"
              className="bg-blue-400 text-gray-700 px-2 py-1 rounded-md text-sm hover:bg-blue-500"
            >
              Visitar
            </a>
            
             <button
              onClick={() => handleEdit(doc.id)}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-sm hover:bg-gray-400"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(doc.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default ProductEdit;