import {useContext, useEffect, useRef, useState} from 'react'
import {app} from '../database/config'
import {getFirestore, addDoc, collection} from 'firebase/firestore'
import UserOrderForm from '../helpers/UserOrderForm'
import OrderSheet from '../components/OrderSheet'
import html2canvas from 'html2canvas';
import { UserCartContext } from '../context/UserCartContext';

import { NavLink } from 'react-router-dom';


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
        const isOrderConfirm = confirm('Estas seguro que quieres confirmar tu orden? no podras deshacer esta accion :(')

        if (!user || !userNum || !userMail){
                alert('Hay campos por rellenar :(')
                return
              }

            if(isOrderConfirm){
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
              alert('Orden confirmada Correctamente. Descargala para evidenciar tu orden :)')
             }catch(e){
          alert('No se agrego la orden, intentalo mas tarde :(', e.message)
             }
            }else {
                alert('Tu orden no se confirmo.')
            }
 }


  return (
    <div className='relative h-screen flex flex-col gap-2 justify-center
    items-center w-screen py-12'>

<div className='flex w-full mt-40'>

<section className='flex w-full justify-between items-center h-24 px-4' >
  <NavLink to={'/cart'} className='flex gap-1 items-center'> <img src="/src/assets/left-arrow.png" alt="atras" className='w-7 h-7'/> atras </NavLink>


  <NavLink to={'/'} className='flex items-center drop-shadow-xl py-1 px-1'> <img src="/public/big_logo.png" alt="left" className='w-32 h-32'/> </NavLink>
  
  </section>

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