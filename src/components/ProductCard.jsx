import '../css/Card.css'

function ProductCard({img, sub_category, name, price, available, description }) {
  
  const tag = text => `#${text}`

  return (
    <div className="w-52 rounded-md shadow-2xl relative flex flex-col h-fit overflow-hidden">
    <img src={img} alt="Producto-img" className="w-full skeleton" />
    <div className=" px-3 py-2 overflow-hidden flex justify-start text-left ">
      <div className="font-bold text-base ">{description}</div>
    </div>
    <div className="px-1.5 py-1.5 flex justify-start items absolute top-0 left-0">
      <span className= { available == true ? "inline-block bg-black opacity-40 rounded-sm px-3 py-0.5 text-xs font-normal text-gray-300 mr-2" : "inline-block bg-red-100 opacity-60 rounded px-3 py-1 text-sm font-bold text-gray-700 mr-2 skeleton"  } >{ available == true ? 'Disponible' : 'No disponible'}</span>
    {//  <span className="inline-block bg-gray-200 opacity-60 rounded-full px-3 py-2 text-xs font-bold text-gray-700 mr-2 overflow-hidden absolute"  >{//tag(sub_category)} </span>
    }
    
    </div>
    <div className='w-full flex items-center justify-between px-3 mb-4 mt-2 h-4'>
      <span className='font-semibold font-mono text-base' >{price}</span>
      <button><img src='src/assets/add-cart.png' className="w-6 h-6" loading="lazy" /></button>
    </div>
  </div>
  )
}

export default ProductCard