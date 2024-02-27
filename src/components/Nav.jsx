
import { NavLink } from 'react-router-dom'
import FilterNav from './FiltersNav'
import '../css/Nav.css'
import menuImg from '../assets/menu.png'
import stuffLogo from '../assets/stuff_logo.png'
function Nav({ searchQuery, setQuery, SearchPlaceholder, setFindProducts, setMenuVisible}) {
 
  const handleSearch = () => {
    return setFindProducts(true)
    };

    const handlekeypress = (e) => {
      if(e.key == 'Enter' || e.key == 'Return'){

  return setFindProducts(true)
      }
    
      };
  
    const handleSearchChange = (e)=> {
      setFindProducts(false)
      setQuery(e.target.value)
    }

  
 
  return (
    <div className='w-screen px-3 py-1 bg-page z-30 '>

    <ul className='flex justify-between items-center '>

        <li className=' flex justify-start relative logo-container '>
          <NavLink to='/' className='flex justify-start 'style={{ textDecoration: 'none', textRendering: 'optimizeLegibility' }}>     <img src={stuffLogo} />  </NavLink></li>

          <li className='flex place-content-start flex-grow '>
            <div className='flex w-5/6 md:w-4/6 max-w-96 ' >   
                    <div className="relative md:w-full" name='search'>
                        
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-auto">
                            
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                    <input type="search" 
                     className="block w-full py-2.5 ps-10 text-xs text-gray-900 border border-gray-300 rounded-s-md bg-gray-100 outline-none " value={searchQuery} placeholder={SearchPlaceholder} onChange={ e => handleSearchChange(e)
                     }    onKeyDown={handlekeypress}/>

                  
                </div>
                    <button onClick={handleSearch}
                
                    
                    className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-e-md text-xs px-2 py-2 dark:bg-black dark:hover:bg-black dark:focus:ring-black"> Buscar </button>

            </div>
                    </li>


                    <li onClick={()=>setMenuVisible(true)}> <img src={menuImg} className='w-12 h-12'/>
                    </li>

                </ul>
                <FilterNav setFindProducts={setFindProducts} setQuery={setQuery} searchQuery={searchQuery}/>
                </div>

      
  )
}

export default Nav