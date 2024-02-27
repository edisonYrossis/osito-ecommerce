// ShowProductWrapper.js

import React, { lazy, Suspense, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { productsContext } from '../context/ProductsContext';

// Utiliza React.lazy para cargar dinámicamente el componente
const LazyShowProduct = lazy(() => import('../components/ShowProduct'));

function ShowProductWrapper() {
  const { id } = useParams();
  const { productsList } = useContext(productsContext);

  useEffect(() => {
    // Aquí puedes realizar lógica adicional si es necesario antes de cargar el componente
  }, [id, productsList]);

  // Si no hay un producto seleccionado o no se encuentra en la lista, puedes manejarlo como desees
  if (!productsList || productsList.length === 0) {
    return <div>No se encontraron productos.</div>;
  }

  const selectedProduct = productsList.find((product) => product.id === id);

  if (!selectedProduct) {
    return <div>El producto no existe.</div>;
  }

  return (
    <div className='flex flex-col relative'>
      {/* Resto del código del componente actual */}
      <Suspense fallback={<div>Cargando...</div>}>
        {/* Utiliza el componente cargado dinámicamente */}
        <LazyShowProduct />
      </Suspense>
    </div>
  );
}

export default ShowProductWrapper;
