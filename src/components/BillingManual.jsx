import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import leftArrow from '../../src/assets/left-arrow.png'
import BillingModule from './BillingModule'
import html2canvas from 'html2canvas'

function BillingManual() {

    const billingRef = useRef(null)


    const [prewBill, setPrewBill] = useState(false)
  const [previewBilling, setPreviewBilling] = useState(false)

    const [clienteNombre, setClienteNombre] = useState('')
    const [clienteNumero, setClienteNumero] = useState('')
    const [clienteMail, setClienteMail] = useState('')
    const [clienteTipo, setClienteTipo] = useState('Nuevo')
    const [clientePago, setClientePago] = useState('Efectivo')
    const [fechaDelPedido, setFechaDelPedido] = useState('')
    const [ubicacionDelPedido, setUbicacionDelPedido] = useState('')
    const [listaDeProductos, setListaDeProductos] = useState([])

    const [producto, setProducto] = useState({
        name: '',
        description: '',
        options: '',
        price: 0,
        quantity: 1
      });

    const handleChangeClienteNombre = (e)=> {
        setClienteNombre(e.target.value)
    }
    const handleChangeClienteMail = (e)=> {
        setClienteMail(e.target.value)
    }
    const handleChangeClienteNumero = (e)=> {
        setClienteNumero(e.target.value)
    }
    const handleChangeClienteTipo = (e)=> {
        setClienteTipo(e.target.value)
    }
    const handleChangeClientePago = (e)=> {
        setClientePago(e.target.value)
    }
    const handleChangeFechaDelPedido = (e)=> {
        setFechaDelPedido(e.target.value)
    }
    const handleUbicacionDelPedido = (e)=> {
        setUbicacionDelPedido(e.target.value)
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
          downloadLink.download = `${clienteNombre}.jpeg`;
      
          // Simular el clic en el enlace para iniciar la descarga
          downloadLink.click();
        } catch (error) {
          console.error('Error al generar la factura:', error);
          // Manejar errores de generación de factura
        }
    
       }

       const viewBill = () => {
        setPrewBill(true)
       }


       const agregarProducto = (event) => {
        event.preventDefault();
        setListaDeProductos(prevListaProductos => [...prevListaProductos, producto]);

        setProducto({
          name: '',
          description: '',
          options: '',
          price: 0,
          quantity: 1
        });
      };

      const eliminarProducto = (index) => {
        setListaDeProductos(prevListaProductos => prevListaProductos.filter((_, i) => i !== index));
      };

      const formatDate = (fechaInput) => {
        // Utilizar toLocaleDateString con opciones para obtener la fecha en el formato deseado
        const fecha = new Date(fechaInput);
  
        // Obtener el día, mes y año de la fecha
        const dia = (fecha.getDate() + 1).toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
        const año = fecha.getFullYear().toString().slice(-2); // Tomamos los últimos dos dígitos del año
        
        // Concatenar el día, mes y año con el separador "/"
        const fechaFormateada = `${dia}/${mes}/${año}`;
        
        return fechaFormateada;
      };
      
    
      
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
                   {previewBilling && <BillingModule clientName={clienteNombre } clientNum={clienteNumero} clientMail={clienteMail} clientType={clienteTipo} clientPayment={clientePago} productList={listaDeProductos} orderId={'Personalizado'} orderDate={formatDate(fechaDelPedido)} totalAmount={listaDeProductos.reduce((acumulador, producto) => acumulador + parseFloat(producto.price), 0)} orderUbicacion={ubicacionDelPedido} ref={billingRef}/>
              }
              </span>
          </main>
             

           
        </div>

</div>

}
      </div>

      <div className='w-full flex justify-center gap-6 items-center flex-col h-dvh'>


<section className='flex gap-5 flex-col lg:flex-row mt-12'>
    <div className='w-fit p-8 rounded-lg bg-green-200 shadow-lg h-fit'>
                <form className='flex flex-col text-left gap-5' >
                
                <h1 className='font-semibold text-2xl'>Añadir Producto Nuevo</h1>
                    <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Nombre Producto</label>
                    <input type="text" placeholder='Nombre del Producto' name='nombre' className='py-2 rounded-lg shadow-md px-2'  value={producto.name} onChange={(event) => setProducto(prevProducto => ({ ...prevProducto, name: event.target.value }))}
 />
                    </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Descripcion</label>
                    <input type="text" placeholder='Descripcion del producto' className='py-2 rounded-lg shadow-md px-2' name='descripcion' value={producto.description}    onChange={(event) => setProducto(prevProducto => ({ ...prevProducto, description: event.target.value }))}
/>
                </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Opcion Elegida</label>
                    <input type="text" placeholder='Opcion elegida' className='py-2 rounded-lg shadow-md px-2' name='opcionElegida' value={producto.options} onChange={(event) => setProducto(prevProducto => ({ ...prevProducto, options: event.target.value }))}
/>
                </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Precio en Dolares</label>
                  <span className='flex gap-0.5 justify-center items-center'> <h2>$</h2> <input readOnly placeholder='$$$'className='py-2 rounded-lg shadow-md px-2 w-28' name='precio' value={producto.price} 
/>
                    </span> 
                </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Precio en Pesos</label>
                  <span className='flex gap-0.5 justify-center items-center'> <h2>RD$</h2> <input type="number" placeholder='RD$0000'className='py-2 rounded-lg shadow-md px-2 w-28' name='precio' onChange={(event) => setProducto(prevProducto => {
                    const p = event.target.value
                    const res = p / 59
                  return ({ ...prevProducto, price: res.toFixed(2) })
                  })}
/>
                    </span> 
                </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Cantidad</label>
                    <input type="number" placeholder='Cantidad'className='py-2 rounded-lg shadow-md px-2' value={producto.quantity}   onChange={(event) => setProducto(prevProducto => ({ ...prevProducto, quantity: event.target.value }))}
/>
                </span>
                
                <span className='bg-blue-700 py-1.5 px-6 rounded-lg text-lg font-semibold  text-white shadow-lg w-fit h-fit' onClick={agregarProducto} >
 Añadir Producto

 
</span>
                

                </form>


     <div className="bg-gray-100 p-4 rounded-lg h-fit my-auto mt-3">
        <h2 className="font-semibold text-lg">Lista de Productos</h2>
        <ul className="list-disc list-inside">
          { listaDeProductos && listaDeProductos.map((producto, index) => (
            <li key={index} className="flex justify-between items-center py-1">
              <div>{producto.name} - {producto.description} - {producto.options} - {producto.price} - {producto.quantity}</div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => eliminarProducto(index)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

            </div>

            <div className='w-fit p-8 rounded-lg bg-gray-200 shadow-lg h-fit'>
                <form className='flex flex-col text-left gap-5'>
                
                
                    <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Nombre Cliente</label>
                    <input type="text" placeholder='Nombre del cliente' value={clienteNombre} onChange={handleChangeClienteNombre} className='py-2 rounded-lg shadow-md px-2' />
                    </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Gmail</label>
                    <input type="text" placeholder='Mail del cliente' value={clienteMail} onChange={handleChangeClienteMail} className='py-2 rounded-lg shadow-md px-2'/>
                </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Numero</label>
                    <input type="text" placeholder='Numero del cliente' value={clienteNumero} onChange={handleChangeClienteNumero} className='py-2 rounded-lg shadow-md px-2'/>
                </span>
                
                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Tipo de Cliente</label>
                    <select className='outline-none text-sm' value={clienteTipo} onChange={handleChangeClienteTipo} > 
                                <option value='Nuevo'>Nuevo</option>
                                <option value='Premium'>Premium</option>
                                <option value='Regular'>Regular</option>
                                <option value='Leal'>Leal</option>
                            </select>
                
                </span>

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Pago: </label>
                    <select className='outline-none text-sm' value={clientePago} onChange={handleChangeClientePago}> 
                                <option value='Efectivo'>Efectivo</option>
                                <option value='Transfern.'>Transfern.</option>
                            </select>

                </span>

                <span className='flex flex-col gap-1'>   
                <label htmlFor="" className='font-semibold text-lg'> Fecha del pedido</label>
                    <input type="date"  value={fechaDelPedido} onChange={handleChangeFechaDelPedido}/>
                </span>
                

                <span className='flex flex-col gap-1'>
                    <label htmlFor="" className='font-semibold text-lg'>Ubicacion del pedido</label>
                <select name="" id=""  value={ubicacionDelPedido} onChange={handleUbicacionDelPedido}>
                                <option value='Los Tres Brazos'>Los Tres Brazos</option>
                                <option value='Los Mina'>Los Mina</option>
                                <option value='Personalizado'>Personalizado</option>
                </select>
                </span>
                

                </form>
            </div>
</section>
            

<span className='bg-blue-500 py-1.5 px-6 rounded-lg text-lg font-semibold  text-white shadow-lg w-fit h-fit' onClick={viewBill}>
    Ver Factura
</span>
      </div>


 



    


   
    </>
  )
}

export default BillingManual