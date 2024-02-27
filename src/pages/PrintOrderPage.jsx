import {useContext, useEffect, useRef, useState} from 'react'
import {app} from '../database/config'
import {getFirestore, addDoc, collection} from 'firebase/firestore'
import UserOrderForm from '../helpers/UserOrderForm'
import OrderSheet from '../components/OrderSheet'
import html2canvas from 'html2canvas';
import { UserCartContext } from '../context/UserCartContext';
import  leftImg from '../assets/left-arrow.png'

import { NavLink } from 'react-router-dom';
import nyanCatGif from '../assets/nyan-cat.gif'
import Swal from 'sweetalert2'


function PrintOrderPage() {

    const {user, userMail, userNum, orderShipping, cartItems, totalAmount} = useContext(UserCartContext)
    const [viewUserOrderForm, setViewUserOrderForm] = useState(true)
    const [confirmOrder, setConfirmOrder] = useState(false)
    const [orderID, setOrderID] = useState(false)

    const orderSheetRef = useRef(null);

    const handleDownloadOrder = ()=> {
        const orderSheetNode = orderSheetRef.current
      
        html2canvas(orderSheetNode, {
            backgroundColor: '#f1f1f1',
            width: orderSheetNode.offsetWidth,
            height: orderSheetNode.offsetHeight,
            letterRendering: true,
            allowTaint: true,
            scale: 8,
          }).then((canvas) => {
            // Convertir el lienzo a un objeto Blob
            canvas.toBlob((blob) => {
              // Crear una URL para el Blob
              const url = URL.createObjectURL(blob);
        
              // Crear un enlace
              const link = document.createElement('a');
        
              // Establecer atributos del enlace
              link.href = url;
              link.download = `${user}.png`;
        
              // Agregar el enlace al documento
              document.body.appendChild(link);
        
              // Hacer clic en el enlace
              link.click();
        
              // Eliminar el enlace del documento
              document.body.removeChild(link);
        
              // Liberar recursos
              URL.revokeObjectURL(url);
            }, 'image/png');
          });
        };

    const handleConfirmOrder = async () => {
        Swal.fire({
          title: "Estas seguro que quieres confirmar tu orden?",
          text: 'No podras deshacer esta accion',
          width: 450,
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Confirmar",
        }).then( async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            if (!user || !userNum || !userMail){
              Swal.fire({
                icon: "error",
                title: "Transaccion Cancelada",
                width: 400,
                text: "Faltan campos por llenar :(",
              });
              return
            }
               try{
          const db = getFirestore(app)
            const collectionref = collection(db, 'ordenes')
            const docref = await addDoc(collectionref, {
              user_data: {
              user: user,
              mail: userMail,
              num:  userNum
              },
              order_id: orderID,
              order_type: orderShipping.order_type,
              order_ubication: orderShipping.order_ubication,
              order_items: cartItems,
              amount: totalAmount,
              order_date: new Date().toLocaleDateString()
             
            })
            setConfirmOrder(true)
            Swal.fire({
              title: "Orden confirmada satisfactoriamente",
              width: 400,
              padding: "1em",
              color: "#008000",
              background: "#fff",
              icon: 'success',
              backdrop: `
              rgba(0, 0, 123, 0.4),
            `

            });
           }catch(e){
            Swal.fire({
              icon: "error",
              title: "Ha ocurrido un error",
              text: `Intetalo mas tarde o comunicate con nosotros. ${e.message}`,
             
            });
          }
          } else if (!result.isConfirmed) {
           
            Swal.fire({
              icon: "error",
              title: "Transaccion Cancelada",
              width: 400,
              text: "No se confirma la orden!",
            });
            return;
          }
          
        });
              
 }


  return (
    <div className='relative h-screen flex flex-col gap-2 justify-center
    items-center w-screen py-12'>

<div className=' relative flex w-full'>

<div className='fixed top-0 w-full'>
  <section className='flex w-full justify-between items-center h-24 px-4' >
  <NavLink to={'/cart'} className='flex gap-1 items-center'> <img src={leftImg} alt="atras" className='w-7 h-7'/> atras </NavLink>

  <h1 className='font-bold text-1xl pr-8'>Confirma Tu Orden</h1>
  
  </section>
</div>

  </div>

    <UserOrderForm viewUserOrderForm={viewUserOrderForm} setViewUserOrderForm={setViewUserOrderForm} setOrderID={setOrderID}/>
    
    <OrderSheet ref={orderSheetRef} confirmOrder={confirmOrder} orderID={orderID} /> 

    <button className={`bg-black rounded-sm py-1 px-2 text-white mt-2 ${confirmOrder ? 'hidden' : 'visible'}`}
    onClick={()=> setViewUserOrderForm(true)}>Actualizar mis datos</button>

<button className={`bg-green-600 rounded-sm py-1 px-2 text-white mt-2 ${confirmOrder ? 'hidden' : 'visible'}`} 
 onClick={handleConfirmOrder} >Confirmar Orden</button>


<section className={`${confirmOrder ? 'visible' : 'hidden'} mt-4 pb-10`} >
    <p className='text-xs px-2'>Descarga tu orden o has un ScreenShot, luego envianos tu orden por WhatsApp o por instagram para confirmar tu pedido :) </p>
    <p className='text-sm font-semibold'>Click aqui para escribirnos directamente. </p>
    <span className='flex gap-3 w-full justify-center'><button className={`bg-blue-500 rounded-sm py-1 px-2 text-white mt-2 `} 
 onClick={handleDownloadOrder} >Descargar Orden</button>
  <a href="https://wa.me/message/GSYRRK3WBVI6C1" target='_blank' className={`bg-green-500 rounded-sm py-1 px-2 text-white mt-2 flex gap-1 items-center`} 
 > <img src="src/assets/whatsapp.png" alt="Whatsapp" className='w-5 h-5' />
 <p> Envianos tu orden por WhatsApp </p>
 </a>

 </span>
   
</section>



    </div>


  )
}

export default PrintOrderPage