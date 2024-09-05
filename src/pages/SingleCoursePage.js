import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCoursesContext } from '../context/courses_context';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';
import axios from 'axios';

const SingleCoursePage = () => {
  const { id } = useParams(); // Correct use of "id" to match the URL param
  const { addToCart } = useCartContext();
  const [course, setCourse] = useState({});
  const [reviews, setReviews] = useState([]);

  // Fetch course details based on the ID
  useEffect(() => {
    const fetchSingleCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8100/books/${id}`);
        setCourse(response.data); // Set course data to state
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching the course:', error);
      }
    };
    fetchSingleCourse();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8100/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  const { name, author, outline, img } = course;

  return (
    <SingleCourseWrapper>
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
          <img src={img} alt={name} />
        </div>
        <div className='course-details'>
          <div className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'>{author}</div>
          <div className='course-head'>
            <h5>{name}</h5>
          </div>
          <div className='course-body'>
            <p className='course-para fs-18'>{outline}</p>
          </div>
          <div className='course-btn'>
            <Link to="/cart" className='add-to-cart-btn d-inline-block fw-7 bg-purple' onClick={() => addToCart(id, name, author, outline, img)}>
              <FaShoppingCart /> Add to cart
            </Link>
          </div>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-content mx-auto'>
          <div className='course-sc-title'>All Reviews</div>
          <ul className='course-content-list'>
            {
              reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <li key={idx}>
                    <div>
                      <span>Customer: {review.customer.name}</span><br />
                      <span>Book: {review.book.name}</span><br />
                      <span>Date: {review.reviewDate}</span><br />
                      <span>Comment: {review.comment}</span><br />
                    </div>
                  </li>
                ))
              ) : (
                <li>No reviews available</li>
              )
            }
          </ul>
        </div>

        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Write Reviews</div>
          <ul className='course-content-list'>
            <form className='write'>
              <input type='text' placeholder='Write your comment.' className='comment mx-auto' /><br />
              <button type='submit' className='writeDone'>Send</button>
            </form>
          </ul>
        </div>
      </div>
    </SingleCourseWrapper>
  );
}

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para{
      padding: 12px 0;
    }
    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count{
      margin-left: 8px;
    }
    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info{
      li{
        margin-bottom: 2px;
        &:nth-child(2){
          margin-top: 10px;
        }
      }
      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;
      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn{
      margin-top: 16px;
      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details{
        padding-top: 0;
      }
      .course-img{
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;
    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        li{
          margin: 5px 0;
          display: flex;
          span{
            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{
        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }

`;

export default SingleCoursePage
