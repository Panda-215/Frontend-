import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCartContext } from '../context/cart_context';

const Course = () => {
  const [courses, setCourses] = useState([]); 
  const { addToCart } = useCartContext();
  // ฟังก์ชันเพื่อดึงข้อมูลคอร์สจาก API
  const fetchCourses = async () => {
    try {

      const response = await axios.get('http://localhost:8100/books'); 
      setCourses(response.data); 
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // ดึงข้อมูลเมื่อ component ถูกโหลด
  useEffect(() => {
    fetchCourses();
  }, []);

  // แสดงผล Loading ขณะข้อมูลยังไม่ถูกดึง
  if (courses.length === 0) {
    return <div>Loading...</div>;
  }

  // แสดงผลข้อมูลที่ได้รับจาก API
  return (
    <div>
      {courses.map((course) => {
        const { id, name, author, outline,img } = course; // ดึงข้อมูลแต่ละอันจาก API
        return (
          <CourseCard key={id}>
            <div className='item-img'>
              <img src={img} alt='' />
            </div>
            <div className='item-body'>
            <h5 className='item-name'>{name}</h5>
              <span className='item-creator'>Author : {author}</span>
           {/*  <p className='item-outline'>{outline}</p> */}
              <div className='item-btns flex'>
                <Link to={`/courses/${id}`} className="item-btn see-details-btn">See details</Link>
                <Link to="/cart" className='item-btn add-to-cart-btn' onClick={() => addToCart(id, name, author, outline, img)}>Borrow</Link>
              </div>

            </div>
          </CourseCard>
        );
      })}
    </div>
  );

  
};

const CourseCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  .item-body{
    margin: 14px 0;
    padding: 4px 18px;

    .item-name{
      font-size: 15px;
      line-height: 1.4;
      font-weight: 800;
    }
    .item-creator{
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }

    .item-btns{
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;
    .item-btn{
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn{
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;

        &:hover{
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn{
        background: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
        border: 1px solid rgba(0, 0, 0, 0.9);

        &:hover{
          background-color: transparent;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`;
  

export default Course;