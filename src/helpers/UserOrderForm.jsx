import { useContext, useEffect, useState } from 'react'
import { UserCartContext } from '../context/UserCartContext'
import {main_order_options} from '../data/main_order_options'
import { nanoid } from 'nanoid'

function UserOrderForm({viewUserOrderForm, setViewUserOrderForm, setOrderID}) {

    const {user,
         setUser, 
        orderShipping, 
        SetOrderShipping, 
         userNum,
        setUserNum,
        userMail,
        setUserMail} = useContext(UserCartContext)

        const [ubicationList, setUbicationList] = useState([])
        const [sendType, setSendType] = useState(()=> {
          const getLocal = JSON.parse(localStorage.getItem('userdata'))
          return getLocal ? getLocal.order_type : ''
        })
        const [sendUbication, setSendUbication] = useState(()=> {
          const getLocal =  JSON.parse(localStorage.getItem('userdata'))
          return getLocal ? getLocal.order_ubication : ''
        })

        const updateStorage = (updateUser) => {
          localStorage.setItem('userdata', JSON.stringify(updateUser));
        };


        const handleSubmit = async (e)=> {
            e.preventDefault()
            setViewUserOrderForm(false)
            updateStorage({
              user: user,
              num: userNum,
              mail: userMail,
              order_type: orderShipping.order_type,
              order_ubication: orderShipping.order_ubication
             })
             setOrderID(nanoid(6))


        }


        const handlePhoneNumberChange = (e) => {
            const inputValue = e.target.value.replace(/[^\d]/g, ''); // 
           return setUserNum(inputValue)
        }

        useEffect(()=> {

       const listFiltered = main_order_options.filter( opt => opt.category === sendType)

        setUbicationList(listFiltered)

        }, [sendType])

        useEffect(()=>{
            if (sendUbication && sendType) {
                SetOrderShipping({
                  order_type: sendType,
                  order_ubication: sendUbication
                });
              }
        }, [sendUbication, sendType])

 

  return (
    <div className={`fixed top-0 w-screen h-screen z-50 ${viewUserOrderForm ? 'visible' : 'hidden'}`} style={{ background: 'rgba(0, 0, 0, 0.2)' }}>

        <div className=' flex justify-center items-center h-5/6 ' >
              <section className='w-5/6 h-4/6 shadow-md md:w-1/3 bg-white p-8 flex flex-col justify-around'>
                <h1 className='text-xl font-semibold'>Formulario de Orden</h1>
                <form className='flex flex-col gap-7 justify-center items-center mb-8'>
                
                <h2 className='text-base font-medium'>Llena con tus datos</h2>
                <input
                        type="text"
                        className='w-4/5 border-b-2 border-black'
                        placeholder='Nombre...'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        maxLength={25}
                        required
                        style={{ touchAction: 'manipulation' }}
                        />

                        <input
                        type="email"
                        className='w-4/5 border-b-2 border-black'
                        placeholder='Mail...'
                        value={userMail}
                        onChange={(e) => {
                            const lowerval = e.target.value.toLowerCase()
                            return setUserMail(lowerval)
                        }}
                        required
                        style={{ touchAction: 'manipulation' }}
                        />

                        <input
                        type="number"
                        className='w-4/5 border-b-2 border-black'
                        placeholder='Numero de contacto'
                        value={userNum}
                        onChange={(e) => handlePhoneNumberChange(e)}
                        required
                        minLength={12}
                        maxLength={12}
                        style={{ touchAction: 'manipulation' }}
                        />
                    <span className='flex flex-col gap-3 items-start'>
                      
                      <span className='text-left'>
                        <label className='font-medium'>Datos de Envio:</label>
                        <p className='text-xs font-light'>Los datos del envio pueden cambiar antes de la factura.</p>
                      </span>

                         <section>
                                    <label>Tipo de envio:</label>
                                <select className='outline-none' value={sendType} onChange={(e) => setSendType(e.target.value)} required>
                                <option value="">Elegir</option>
                                <option value="domicilio">Domicilio</option>
                                <option value="metro">Metro</option>
                                <option value="Personalizado">Personalizado</option>
                                </select>
                                </section>
                                <section>
                                    <label>Ubicacion</label>
                                <select className='outline-none' value={sendUbication} onChange={e => setSendUbication(e.target.value)} required>
                                    <option value={''}>Elegir</option>
                               {ubicationList.map((ubi => <option key={ubi.value}value={ubi.value}>{ubi.value}</option>))}
                               <option value={'Personalizado'}>Personalizado</option>
                                </select>
                            </section>
                    </span>
                   
                  
                    <button className='px-2 py-1 bg-black rounded-sm text-white w-fit' onClick={handleSubmit} >Guardar Datos </button>
                </form>
            </section>
        </div>
       
          
       

    </div>
  )
}

export default UserOrderForm