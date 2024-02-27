import {createContext, useState, useReducer, useEffect} from 'react'
import {dollarToDom, calcPrice} from '../helpers/calculatePrice'

export const UserCartContext = createContext()

export function UserCartContextProvider({children}){
 
  const updateStorage = (updatedCart) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const [user, setUser] = useState(()=> {
    const getLocal = JSON.parse(localStorage.getItem('userdata'))
    return getLocal ? getLocal.user : ''
  })
  const [userMail, setUserMail] = useState(()=> {
    const getLocal = JSON.parse(localStorage.getItem('userdata'))
    return getLocal ? getLocal.mail : ''
  })
  const [userNum, setUserNum] = useState(()=> {
    const getLocal = JSON.parse(localStorage.getItem('userdata'))
    return getLocal ? getLocal.num : ''
  })
  const [orderShipping, SetOrderShipping] = useState({})

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Lógica para agregar un producto al carrito
        return [...state, action.payload];

        case 'INITIALIZE_CART':
      // Inicializar el carrito con los elementos guardados en localStorage
      return action.payload;
        
      case 'UPDATE_QUANTITY':
        // Lógica para actualizar la cantidad de un producto
        return state.map(item => {
            if (item.product_id === action.payload.id && item.options === action.payload.itemOption ) {
              const newQuantity = item.quantity + action.payload.amount;
    
              // Establecer límite máximo y mínimo
              const updatedQuantity = Math.max(1, Math.min(newQuantity, 15));
    
              return { ...item, quantity: updatedQuantity };
            } else {
              return item;
            }
          });
        ;
      case 'REMOVE_FROM_CART':
        // Lógica para eliminar un producto del carrito
        return state.filter(item => item.cart_item_id !== action.payload);
      default:
        return state;
    }
  };

const [cartItems, dispatch] = useReducer(cartReducer, []);

// Funciones para interactuar con el carrito
const addToCart = (item) => {
  dispatch({ type: 'ADD_TO_CART', payload: item });
  updateStorage([...cartItems, item])
};

const updateCartItemQuantity = (id, itemOption, amount) => {
  dispatch({ type: 'UPDATE_QUANTITY', payload: { id, itemOption, amount } });
  const updatedCart = cartItems.map(item => {
    if (item.id === id && item.options === itemOption) {
      const newQuantity = item.quantity + amount;
      const updatedQuantity = Math.max(1, Math.min(newQuantity, 15));
      return { ...item, quantity: updatedQuantity };
    } else {
      return item;
    }
    
  })
  updateStorage(updatedCart)
};

const removeFromCart = (id) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateCart = cartItems.filter((item) => item.cart_item_id !== id)
  updateStorage(updateCart)
};


const [totalAmount, setTotalAmount] = useState(0)

useEffect(() => {
  const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  dispatch({ type: 'INITIALIZE_CART', payload: savedCartItems });
}, []);


useEffect(() => {
  const newTotalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price);
    return total + itemPrice * item.quantity;
  }, 0);


  if (!isNaN(newTotalPrice) && newTotalPrice !== totalAmount) {
    setTotalAmount(newTotalPrice);
  }

  // No incluyas totalAmount en las dependencias para evitar ciclos infinitos
}, [cartItems]);

    const val = {
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        totalAmount,
        dollarToDom,
        calcPrice,
        user,
        setUser,
        orderShipping,
        SetOrderShipping,
        userNum,
        setUserNum,
        userMail,
        setUserMail
    }
   
   return <UserCartContext.Provider value={val}>
    {children}
    </UserCartContext.Provider>
}