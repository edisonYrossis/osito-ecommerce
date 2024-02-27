import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';  // Si estás utilizando React Router
import { app } from '../database/config';
import { dollarToDom } from '../helpers/calculatePrice';
import Swal from 'sweetalert2';
// importar otros módulos necesarios

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
        const db = getFirestore();
        const ordersCollection = collection(db, 'ordenes');
  
        try {
          const snapshot = await getDocs(ordersCollection);
          const ordersData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
  
      fetchOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    const db = getFirestore();
    const orderDoc = doc(db, 'ordenes', orderId);
    
      Swal.fire({
        title: "Seguro que quieres eliminar esta orden?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Eliminar",
      }).then( async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          try {
            await deleteDoc(orderDoc);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
            Swal.fire({
              title: "Operacion exitosa!",
              text: "Orden Eliminada!",
              icon: "success"
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Ha ocurrido un error",
              text: error.message,
            });
        }} else if (!result.isConfirmed) {
         
          Swal.fire({
            icon: "error",
            title: "Transaccion Cancelada",
            text: "No se elimino la orden!",
          });
          return;
        }
        
      });
  

  };

  useEffect(()=>{
    if(!orders){
        return
    }
  }, [orders])

  return orders.length > 0 ? (
    <div className="mx-auto p-4 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">{`Lista de Órdenes(${orders.length})`}</h2>
      <ul className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {orders.map((order) => (
          <li key={order.id} className="mb-6 bg-red-50 p-4 rounded-md shadow-md w-full">


<section className='w-full mb-3 text-gray-400 text-xs flex justify-between'>
    <span className='text-left'>
         <p>{order.order_date}</p>
          <p>{order.order_id}</p>
         
    </span>
    <span>
    <button
              className=" bg-red-600 text-white py-1.5 px-2 rounded-md text-xs font-semibold"
              onClick={() => handleDeleteOrder(order.id)}
            >
              Eliminar Orden
            </button>
    </span>
   
   
</section>
            <div className='flex justify-between'>
                 <div className="mb-4 text-left">
                 <h3 className="text-lg font-bold">Cliente</h3> 
                    <span className='text-xs'>
                         <p className="font-bold">{order.user_data.user}</p>
              <p> {order.user_data.mail}</p>
              <p>{order.user_data.num}</p>
                    </span>
             
            </div>

            <div className="mb-4 text-right">
              <h3 className="text-base font-bold">Detalles de la Orden</h3>
            
            <span className='text-xs'>
                 <p>Tipo de Envío: {order.order_type}</p>
              <p>{order.order_ubication}</p>
              <p className='font-semibold'>Total: {dollarToDom(order.amount)}</p>
                </span> 
            </div>
            </div>
           

            <div>
             
              <ul className='w-full flex flex-col gap-1'>
                {order.order_items && order.order_items.map((item, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <img
                      src={item.URL} // Reemplaza con la URL de la imagen pequeña del producto
                      alt={item.name}
                      className="w-5 h-5 rounded-full"
                    />
                    <div className='flex justify-between flex-grow text-xs'>
                        <span className=' flex-grow text-left'>
                             <p className="font-bold">{item.name}</p>
                        </span>
                     
                     
                     <span className=' w-2/6'>
                         <p className='text-right'> {dollarToDom(item.price)}</p>

                     </span>
                     
                     <span className='pl-3 flex gap-2'>
                     <Link to={`/${item.product_id}`} target="_blank" rel="noopener noreferrer" className="text-green-800 underline text-sm">
                        Ver
                      </Link>
                      
                         <a href={item.product_URL} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm">
                        Revisar
                      </a>
                     </span>
                     
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  ) : <div>
    <h2 className="text-2xl font-bold mb-4">{`Lista de Órdenes`}</h2>
    <p>No hay Ordenes :(</p>
  </div>
};



export default OrdersList;


