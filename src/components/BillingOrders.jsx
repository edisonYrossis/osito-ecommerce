import leftArrow from "../../src/assets/left-arrow.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../database/config";
import { dollarToDom } from "../helpers/calculatePrice";
import Swal from "sweetalert2";
import BillingModule from "./BillingModule";
import html2canvas from "html2canvas";


function BillingOrders() {

const billingRef = useRef(null)

  const [orders, setOrders] = useState([]);
  const [prewBill, setPrewBill] = useState(false)
  const [previewBilling, setPreviewBilling] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      const db = getFirestore();
      const ordersCollection = collection(db, "ordenes");

      try {
        const isLocalOrder = localStorage.getItem('orders')
        const snapshot = await getDocs(ordersCollection);
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if(isLocalOrder){
          const localOrdersParse = JSON.parse(isLocalOrder)
          if(localOrdersParse !== ordersData && ordersData.length > 0 ){
            localStorage.setItem('orders', JSON.stringify(ordersData))
          }
        }
         if(isLocalOrder){
            const localOrders = JSON.parse(isLocalOrder)
            if(localOrders == []){
                return
            }
          setOrders(localOrders)
         }

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  useEffect(() => {
    if (!orders) {
      return;
    }
  }, [orders]);

  const buildBill = (order) => {
    setPrewBill(true)
    setSelectedOrder(order)
    
  }

  const handleDownload = async () => {
    const input = billingRef.current
    const escalaMaxima = 6
    const offsetAncho = billingRef.current.offsetWidth

    const images = input.querySelectorAll('img');
    const imageUrls = [];
  
    // Crear promesas para cargar cada imagen
    const promises = Array.from(images).map(image => {
      return new Promise((resolve, reject) => {
        if (image.complete) {
          resolve();
        } else {
          image.onload = resolve;
          image.onerror = reject;
        }
      });
    });
  
    try {
      // Esperar a que todas las imágenes estén cargadas
      await Promise.all(promises);
  
      // Generar el archivo de imagen una vez que todas las imágenes estén cargadas
      const canvas = await html2canvas(input, {
        scale: escalaMaxima,
        width: offsetAncho,
        image: {
          crossorigin: 'anonymous',
          allowTaint: true,
          proxy: 'https://cors-anywhere.herokuapp.com/',
          urls: Array.from(images).map(image => image.src)
        }
      });
  
      // Crear enlace de descarga
      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = `${selectedOrder.user_data.user}.jpeg`;
  
      // Simular el clic en el enlace para iniciar la descarga
      downloadLink.click();
    } catch (error) {
      console.error('Error al generar la factura:', error);
      // Manejar errores de generación de factura
    }

   }
  

  return (
    <>
    {prewBill !== true ? 
         <div className="px-10 py-4 w-fit h-fit" >
        <Link
          to={"billing"}
          className="flex items-center h-10 w-fit "
        >
          <img src={leftArrow} alt="" className="w-10 h-10" />
          <p className="font-semibold text-normal">Back</p>
        </Link>
      </div>:
      ''
    } 

     <div className="relative  bg-opacity-70 z-50">

{prewBill && <div className="flex justify-center pt-5 fixed bg-black bg-opacity-50 backdrop-blur-md w-full h-screen z-50">

 <div className="relative w-fit h-fit p-4 bg-gray-200 rounded-lg overflow-y-scroll min-w-fit">
        <button
                onClick={() => setPrewBill(false)}
                className="absolute top-0 right-0 m-3 px-3 py-1 rounded-md text-gray-500 hover:text-gray-700 bg-red-300 z-40 text-lg"
              >
              x
              </button>
          <main className="relative gap-2">
             <span className={` flex flex-col gap-2 justify-center mt-3 ml-2 z-50 w-fit p-2 bg-slate-100 rounded-xl h-fit shadow-xl ${previewBilling ? 'absolute top-0 left-0': 'block mt-5'}` } >
                <section className="flex flex-col gap-2 justify-center">
                <button className="bg-yellow-500 font-medium text-black rounded-lg px-2 py-0.5" onClick={()=> {setPreviewBilling(!previewBilling)} } >{previewBilling ? 'Ocultar' : 'Ver'}</button>

                <span className="bg-blue-500 font-medium text-white rounded-lg px-2 py-0.5" onClick={handleDownload} >Descargar</span>

                </section>

                <h2 className="text-sm font-semibold">{previewBilling ? '' : 'Muestra la factura para poder descargarla'}</h2>
               
              </span>

              <span className="flex w-full justify-end -z-10 max-w-fit h-fit ">
                   {previewBilling && <BillingModule clientName={selectedOrder.user_data.user } clientNum={selectedOrder.user_data.num} clientMail={selectedOrder.user_data.mail} clientType={'Regular'} clientPayment={'A elegir'} productList={selectedOrder.order_items} orderId={selectedOrder.order_id} orderDate={selectedOrder.order_date} totalAmount={selectedOrder.amount} orderUbicacion={selectedOrder.order_ubication} ref={billingRef}/>
              }
              </span>
          </main>
             

           
        </div>

</div>

}
      </div>


     

      {orders.length > 0 ? (
        <div className="flex flex-col justify-start md:py-8 px-5">
          <h2 className="text-2xl font-bold mb-4">{`Lista de Órdenes(${orders.length})`}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="mb-6 bg-red-50 p-4 rounded-md shadow-md w-full"
              >
                <section className="w-full mb-3 text-gray-400 text-xs flex justify-between">
                  <span className="text-left flex justify-between w-full">
                    <p>{order.order_date}</p>
                    <p>{order.order_id}</p>
                  </span>
                </section>
                <div className="flex justify-between">
                  <div className="mb-4 text-left">
                    <h3 className="text-lg font-bold">Cliente</h3>
                    <span className="text-xs">
                      <p className="font-bold">{order.user_data.user}</p>
                      <p> {order.user_data.mail}</p>
                      <p>{order.user_data.num}</p>
                    </span>
                  </div>

                  <div className="mb-4 text-right">
                    <h3 className="text-base font-bold">
                      Detalles de la Orden
                    </h3>

                    <span className="text-xs">
                      <p>Tipo de Envío: {order.order_type}</p>
                      <p>{order.order_ubication}</p>
                      <p className="font-semibold text-sm bg-gray-100 rounded-lg px-3 w-fit shadow-md">
                        Total: {dollarToDom(order.amount)}
                      </p>
                    </span>
                  </div>
                </div>

                <div>
                  <ul className="w-full flex flex-col gap-1">
                    {order.order_items &&
                      order.order_items.map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <img
                            src={item.URL} // Reemplaza con la URL de la imagen pequeña del producto
                            alt={item.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <div className="flex justify-between flex-grow text-xs">
                            <span className=" flex-grow text-left">
                              <p className="font-bold">{item.name}</p>
                            </span>

                            <span className=" w-2/6">
                              <p className="text-right">
                                {" "}
                                {dollarToDom(item.price)}
                              </p>
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="flex justify-end mt-4">
                    <button className="bg-blue-500 font-medium text-white rounded-lg px-2 py-0.5" onClick={() => buildBill(order)}>Factura</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{`Lista de Órdenes`}</h2>
          <p>No hay Ordenes :(</p>
        </div>
      )}
    </>
  );
}

export default BillingOrders;
