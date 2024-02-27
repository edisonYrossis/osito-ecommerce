import CalcForm from '../components/CalcForm'

function ProductCalc() {
  return (<div className='h-5/6  flex flex-col justify-evenly items-center w-full'>
     <main className='bg-slate-600 w-5/6 rounded-md shadow-md p-2'  style={{'height':'90%','width':'95%'}}>
        <h1 className='text-white font-bold text-2xl'>Calcular Producto</h1>

        <CalcForm />
    </main>
  </div>
  )
}

export default ProductCalc