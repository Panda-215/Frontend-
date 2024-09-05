import React, { useEffect, useContext, useReducer } from "react";
import swal from 'sweetalert';  // Import SweetAlert
import reducer from "../reducers/cart_reducer";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    CLEAR_CART,
    GET_CART_TOTAL
} from "../actions";

const loadCartFromStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

const initialState = {
    cart: loadCartFromStorage(),
    total_items: 0,
    total_amount: 0
}

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = ( id, name, author, outline,img ) => {
        dispatch({
            type: ADD_TO_CART, payload: {
                id, name, author, outline,img 
            }
        });
    }

    const removeFromCart = (id) => {
        if (window.confirm("Are you sure you want to return this book?")) {
            dispatch({ type: REMOVE_CART_ITEM, payload: id });
            checkIcon();
        }
        
    }

    const checkIcon = () => {
        swal("Congrats!", ", Your account is created!", "success");
      };


    const clearCart = () => {
        dispatch({ type: CLEAR_CART })
    }

    useEffect(() => {
        dispatch({ type: GET_CART_TOTAL });
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart]);

    return (
        <CartContext.Provider value={{
            ...state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext);
}