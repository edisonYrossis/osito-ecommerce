import { useState } from 'react'


import MainProductsContainer from '../components/MainProductsContainer'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import HomePageMenu from '../components/HomePageMenu'
import DownNav from '../components/DownNav'
import BacktoTop from '../others/BacktoTop'


 function HomePage() {
 
  const [query, setQuery] = useState('')
 const [findProducts, setFindProducts ] = useState(false)
 const [menuVisible, setMenuVisible] = useState(false)
  

  return <main>
  <section className='relative'>

<section>
  <Nav  searchQuery={query} setQuery={setQuery} SearchPlaceholder={'Covers...'} findProducts={findProducts} setFindProducts={setFindProducts} 
setMenuVisible={setMenuVisible} />
</section>


  <HomePageMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>
  </section>
 <DownNav />
 <BacktoTop />
  <div className={`flex flex-col h-[calc(100vh-40vh)]`}>
      <MainProductsContainer query={query} findProducts={findProducts} />
    
  < Footer />  
  </div>


  </main>
}

export default HomePage

