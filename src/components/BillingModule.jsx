
import '../css/BillingModule.css'
import { dollarToDom } from "../helpers/calculatePrice"
import mainLogoOsito from '../assets/main-logo-osito.png'
import bgOsito from '../assets/bg-osito2.png'
import downFigure from '../assets/billing-down-figure2.png'
import billingName from '../assets/billing-name2.png'
import upFigure from '../assets/billing-up-figure2.png'
import thankYou from '../assets/thank-you-3.png'
import { forwardRef } from 'react'



const BillingModule = forwardRef(({clientName, clientNum, clientMail, clientType, clientPayment, productList, totalAmount, orderId, orderDate, orderUbicacion}, ref) => {

 return <div className="main-billing-div" ref={ref} >

    <img src={mainLogoOsito} className="main-logo-osito"/>
   <img src={bgOsito} className="bg-osito "/>
   <img src={downFigure} className="billing-down-figure"/>
   <img src={upFigure} className="billing-up-figure"/>
   <img src={billingName} className="billing-name "/>
   <img src={thankYou} className="billing-thankyou "/>


<div className="client-info-container text-black h-40 flex justify-between text-sm items-start">
  <ul className="w-1/2 h-1/2 flex flex-col text-left content-start my-auto mx-0 ">
    <li className="content-start w-full text-left text-xs"><h1 className="text-xl"> {`${clientName ? clientName : clientInfoObject.name}`}</h1></li>
    <li className="w-full text-xs">{`${clientNum ? clientNum : clientInfoObject.num}`}</li>
    <li className="w-full text-xs ">{`${clientMail ? clientMail : clientInfoObject.mail}`}</li>
    <li className="w-full text-xs"><h3>{`Fecha orden: ${orderDate}`}</h3></li>

  </ul>
  <ul className="w-1/2 h-1/2 flex flex-col text-right content-start my-auto mx-0">
    <li className="w-full font-bold">NO: {orderId}</li>
     <li className="w-full flex justify-end"> <h2 className="text-xs font-bold">{`Ubicacion:` }</h2> <h2 className="text-xs">{orderUbicacion}</h2> </li>
    <li className="w-full flex justify-end"> <h2 className="text-xs font-bold">{`Cliente:` }</h2> <h2 className="text-xs">{clientType}</h2> </li>
    <li className="w-full flex justify-end"> <h2 className="text-xs font-bold">M. Pago:</h2> <h2 className="text-xs">{clientPayment}</h2> </li>
  </ul>
  
  
  


</div>

<div className="tables-container">

     <div className="fisrt-table-container flex justify-center ">
        <table className="w-full text-left table-auto ">
          <thead className="text-xs text-left">
            <tr className="">
                <th>Producto</th>
                <th >Descripcion</th>
                <th className="w-1/6">Precio</th>
                <th className="w-1/12">Cant.</th>
                <th className="w-1/6 text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody className="text-xs">
        {productList ? productList.map((product, index) => {
          return <tr key={index}>
                <td className="flex justify-start items-center"> <img src={product.URL ? product.URL : 'src/assets/polo1.jpg'} className="w-6 h-6 rounded-xl mr-2"/> <h2>{product.options}</h2> </td>
                <td>{product.name}</td>
                <td>{dollarToDom(product.price)}</td>
                <td>{product.quantity }</td>
                <td itemType="subtotal">{dollarToDom(product.price * product.quantity)}</td>
          </tr>
        }) : 'No hay productos' }
          
          
          </tbody>
        </table>
        </div>

        
        <div className="second-table-container">
          <table className="w-1/3 flex table-auto">
            <thead className="w-1/2 text-right" >
                <tr className=" flex flex-col">
                  <th className="text-xl mt-1  ">Total</th>
                </tr>
            </thead>
            <tbody className="w-1/2 ">
              <tr className=" flex flex-col text-right w-full ">
                <td className="text-xl mt-1 ">{ dollarToDom(totalAmount)  } </td>
              </tr>
            </tbody>
          </table>
        </div>
  </div>
   

</div> 
 
 
})

export default BillingModule