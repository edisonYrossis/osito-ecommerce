import React, { forwardRef, useContext, useRef } from 'react';
import { dollarToDom } from '../helpers/calculatePrice';
import { UserCartContext } from '../context/UserCartContext';

const OrderSheet = forwardRef(({confirmOrder, orderID},ref) => {

    const orderSheetRef = useRef(null);
    const {totalAmount, orderShipping, user, userNum, userMail, cartItems} = useContext(UserCartContext)

  return (
    <div  ref={ref || orderSheetRef}>
    <div className="max-w-min mx-auto bg-white shadow-md p-8 mt-8 rounded-md">

        <section className='flex justify-between items-center'>

       <span className='flex items-start -translate-y-1'>
        <img src="src/assets/stuff_logo.png" alt="Osito Stuff" className='w-32 h-16' /> 
        </span>    

        <h1 className="text-normal font-bold mb-4">Tu Orden</h1>

        <div className='flex flex-col justify-end text-right'>
      <p className="text-xs text-gray-600">Orden ID {orderID ? orderID : 'No confirmada'}</p>
        <p className="text-xs text-gray-600">{new Date().toLocaleDateString()}</p>
      </div>
       
        </section>
    

<section className='flex justify-between'>

<div className="mb-6 text-left">
        <p className="text-base font-medium">Datos del Cliente:</p>
        <p className='text-xs'>{`Nombre: ${user}`}</p>
        <p className='text-xs'>{`Numero: ${userNum}`}</p>
        <p className='text-xs'>{`Mail: ${userMail}`}</p>
      </div>

<div className="mb-6 text-right">
        <p className="text-base font-medium">Detalles del Pedido:</p>
        <p className='text-xs'>{`Tipo de Envío: ${orderShipping.order_type}`}</p>
        <p className='text-xs'>{`Ubicación: ${orderShipping.order_ubication}`}</p>
        <p className={` text-xs font-medium ${confirmOrder ? 'text-green-700' : 'text-red-700'}`}>{`${confirmOrder ? 'Confirmada' : 'No Confirmada'}`}</p>
      </div>
</section>
     

<div className="mb-6">
 
  <table className="min-w-full shadow-sm">
    <thead >
      <tr >
        <th className="text-xs">ID</th>
        <th className="text-xs">Producto</th>
        <th className="text-xs text-right">Cant.</th>
        <th className="text-xs text-right">Precio</th>
      </tr>
    </thead>
    <tbody>
      {cartItems.map((item) => (
        <tr className='border-b-2 border-transparent' key={item.cart_item_id}>
        <td className='text-xs text-left pr-1'>{item.product_id}</td>  
          <td className='text-xs text-right px-2'>{item.name}</td>
          <td className='text-xs'>{item.quantity}</td>
          <td className='text-xs text-right pl-3'>{dollarToDom(item.price)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <div className="mb-2 text-left">
      <p className="text-normal ">{`Subtotal: ${dollarToDom((totalAmount))}`}</p>
        <p className="text-lg font-semibold">{`Total de la Orden: ${dollarToDom((totalAmount))}`}</p>
      </div>

    </div>

    </div>
  );
});

export default OrderSheet;
