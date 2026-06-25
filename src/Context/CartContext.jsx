import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import DataContext from './DataContext';
import Wishlist from '../Components/UserDashboard/Wishlist';

const CartContext = createContext();

const initialState = {
  quantity: 1,
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "products/addItem":
      return { ...state, quantity: state.quantity + 1 };
    case "products/removeItem":
      return {
        ...state,
        quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity,
      };
    case "products/clearItem":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.variantId !== action.payload,
        ),
      };
    case "products/addToCart": {
        const existing = state.cartItems.find(item => item.variantId === action.payload.variantId);
        const items = existing ? state.cartItems.map(prev => prev.variantId === action.payload.variantId ? 
                {...prev, quantity: prev.quantity + action.payload.quantity} : prev ) : [...state.cartItems, action.payload];
        return {...state, cartItems: items};
    }
    case "carts/addItem":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.variantId === action.payload) {
            const newQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * item.productPrice,
            };
          }
          return item;
        }),
      };
    case "carts/removeItem":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.variantId === action.payload) {
            const newQuantity =
              item.quantity === 1 ? item.quantity : item.quantity - 1;
            return {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * item.productPrice,
            };
          }
          return item;
        }),
      };
    case "carts/clearCart" : 
        localStorage.removeItem('cart');
        return {...state, cartItems: [], quantity: 1};
    case "reset/quantity" :
      return {...state, quantity: 1};
    default:
      return state;
  }
};

function init(initialState) {
    const storedCart = localStorage.getItem('cart');
    const result = storedCart ? { ...initialState, cartItems: JSON.parse(storedCart) } : initialState ;
    return result;
}
export function CartProvider ({ children }) {
    const { deliveryFee } = useContext(DataContext);
    const [{ quantity, cartItems }, dispatch] = useReducer(reducer, initialState, init);
    const [ calculatedTotal, setCalculatedTotal ] = useState(0);
    const [ discount, setDiscount ] = useState(0);
     const [ couponCode, setCouponCode ] = useState('');
    const [ cartDetail, setCartDetail ] = useState({});

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const subTotal = useMemo(() => {
        return cartItems.reduce((total, items) => total + items.subTotal, 0);
    }, [cartItems]);

    const total = useMemo(() => {
        if (deliveryFee[0]) {
          return deliveryFee[0].free_shipping_threshold > subTotal ? subTotal + Number(deliveryFee[0]?.flat_rate_fee) : subTotal;
        } else {
          return subTotal;
        }
    }, [subTotal, deliveryFee]);

    useEffect(() => {
      setCalculatedTotal(total);
    }, [total]);

    return (
        <CartContext.Provider value={{quantity, cartItems, calculatedTotal, dispatch, subTotal, discount, setDiscount, setCalculatedTotal,
          couponCode, setCouponCode, cartDetail, setCartDetail,
        }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartContext
