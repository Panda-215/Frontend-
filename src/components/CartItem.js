import React from 'react';
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { useCartContext } from '../context/cart_context';
import axios from 'axios';
import { Link } from "react-router-dom";
import  { useEffect, useState } from 'react';


const CartItem = ({ cartItem }) => {

  const [course, setCourse] = useState({});

  const { removeFromCart } = useCartContext();
 useEffect(() => {
    const fetchSingleCourse = async () => {
      try {
        console.log(11111)
        const response = await axios.get(`http://localhost:8100//books/${cartItem.id}/status`);
        console(22222)
        setCourse(response.data); // Set course data to state
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching the course:', error);
      }
    };
    fetchSingleCourse();
  }, []);



  return (
    <CartItemWrapper className='grid'>
      <div className='cart-item-img'>
        <img src={cartItem.img} alt={cartItem.name} />
      </div>
      <div className='cart-item-info'>
        <p className='fw-7 fs-15'>{cartItem.name}</p>
        <span className='cart-item-creator fs-13 opacity-09'>By {cartItem.author}</span><br></br>
        
        <br />
        <button type="button" className='remove-btn fs-13 text-dark fw-6' onClick={() => removeFromCart(cartItem.id)}>RETURN BOOK </button>

      </div>
    </CartItemWrapper>
  )
}

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .cart-item-img{
    width: 100px;
    height: 100px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cart-item-category{
    padding: 0px 10px;
    border-radius: 6px;
  }
  .remove-btn{
    margin-top: 16px;
    transition: var(--transition);
    &:hover{
      color: var(--clr-purple);
    }
  }
`;

export default CartItem