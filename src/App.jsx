
import {lazy, Suspense} from 'react'
import './css/App.css'
import {ProductsContextProvider} from './context/ProductsContext.jsx'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
     const HomePage = lazy(()=> import('./pages/HomePage'))
     const NotFound = lazy(()=> import('./pages/NotFound'))
     const  Admin = lazy (()=> import('./pages/Admin'))
import { AdminContextProvider } from './context/AdminContext.jsx'
     const  AdminDashboard= lazy (()=> import( './pages/AdminDashboard.jsx'))
     const  ProductForm = lazy (()=> import('./pages/ProductForm.jsx'))
     const  ProtectedRoute = lazy (()=> import('./components/ProtectedRoute.jsx'))
     const  ProductEdit = lazy (()=> import('./pages/ProductEdit.jsx'))
     const FormEditProduct = lazy(()=> import('./components/FormEditProduct.jsx'))
      const ProductCalc = lazy(()=> import('./pages/ProductCalc.jsx'))
     const UserCart = lazy( () =>  import( './pages/UserCart.jsx'))
import { UserCartContextProvider } from './context/UserCartContext.jsx'
import { FaSpinner } from 'react-icons/fa'
import UsersOrders from './pages/UsersOrders.jsx'
const PrintOrderPage = lazy(()=> import ('./pages/PrintOrderPage.jsx'))
      const ShowProductWrapper = lazy (()=> import('./pages/ShowProductContainer.jsx'))


function App() {
  

  return (
   <BrowserRouter>


      <UserCartContextProvider >
    <ProductsContextProvider>
        <AdminContextProvider>
          

                  <Routes>
            
                      <Route path='/*' element={<> <Suspense fallback={ <FaSpinner className="text-xl text-black opacity-80 animate-spin" />}> <HomePage />  </Suspense>  </>} />
                      
                          <Route path='cart' element={ <Suspense fallback={ <FaSpinner className="text-xl text-black opacity-80 animate-spin" />}><UserCart /></Suspense> }/> 

                          <Route path='confirmorder' element={ <Suspense fallback={ <FaSpinner className="text-xl text-black opacity-80 animate-spin" />}><PrintOrderPage /></Suspense> }/>

                         
                          <Route path='product/:id' element={<Suspense fallback={ <FaSpinner className="text-xl text-black opacity-80 animate-spin" />}><ShowProductWrapper /></Suspense> }/>
                    
                      
                          <Route path='/admin' element={<Suspense fallback={ <FaSpinner className="text-xl text-black opacity-80 animate-spin" />}><Admin /></Suspense> }/>
                    
                 
                      <Route element={<Suspense fallback={ <FaSpinner className="text-xl text-black opacity-80 animate-spin" />}><ProtectedRoute /></Suspense> } >
                          <Route path='/dashboard/*' element={<AdminDashboard />}>
                                <Route path='productform' element={<ProductForm />}/>
                                <Route path='productcalculator' element={<ProductCalc />}/>
                                <Route path='productedit' element={<ProductEdit /> }/>
                                <Route path='productedit/:id' element={<FormEditProduct /> }/>
                                <Route path='orders' element={<UsersOrders /> }/>
                            </Route>
                        </Route> 
                
                       


                      <Route  path='*' element={ <NotFound />}/>
          
                    
                  </Routes>

                
                
                
                  </AdminContextProvider>
   </ProductsContextProvider>
   </UserCartContextProvider>
   
   </BrowserRouter>
  
  )
}

export default App
