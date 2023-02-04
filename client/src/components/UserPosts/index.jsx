import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper';
import SwiperCore from "swiper/core";
import './user-posts.scss';
import 'swiper/css';
import { postApi } from '../../services/postService';
import { UserPost } from '../UserPost';
import { useRef } from 'react';

SwiperCore.use([Navigation])

export const UserPosts = ({ userId }) => {
  const { data: posts, isLoading } = postApi.useFetchPostsQuery({ page: 1, limit: 6, userId, order: 'DESC' });
  const nextSlide = useRef(null);
  const prevSlide = useRef(null);

  return (
    <div className="user-posts">
      <h2 className="user-posts__title">Последние посты</h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          prevEl: prevSlide.current,
          nextEl: nextSlide.current,
        }}
        simulateTouch={false}
        autoplay={true}
        className='user-posts__slider'
      >
        <button ref={prevSlide} className="user-posts__slider-btn user-posts__slider-btn--prev">
          <svg
            className="user-posts__slider-btn-icon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_501_697)">
              <path d="M18.9999 25.9999C18.8683 26.0007 18.7379 25.9755 18.616 25.9257C18.4942 25.8759 18.3834 25.8026 18.2899 25.7099C18.1962 25.617 18.1218 25.5064 18.071 25.3845C18.0203 25.2627 17.9941 25.132 17.9941 24.9999C17.9941 24.8679 18.0203 24.7372 18.071 24.6154C18.1218 24.4935 18.1962 24.3829 18.2899 24.2899L26.5899 15.9999L18.2899 7.70994C18.1016 7.52164 17.9958 7.26624 17.9958 6.99994C17.9958 6.73364 18.1016 6.47825 18.2899 6.28994C18.4782 6.10164 18.7336 5.99585 18.9999 5.99585C19.2662 5.99585 19.5216 6.10164 19.7099 6.28994L28.7099 15.2899C28.8037 15.3829 28.8781 15.4935 28.9288 15.6154C28.9796 15.7372 29.0057 15.8679 29.0057 15.9999C29.0057 16.132 28.9796 16.2627 28.9288 16.3845C28.8781 16.5064 28.8037 16.617 28.7099 16.7099L19.7099 25.7099C19.6165 25.8026 19.5057 25.8759 19.3838 25.9257C19.262 25.9755 19.1315 26.0007 18.9999 25.9999Z" />
              <path d="M28 17H4C3.73478 17 3.48043 16.8946 3.29289 16.7071C3.10536 16.5196 3 16.2652 3 16C3 15.7348 3.10536 15.4804 3.29289 15.2929C3.48043 15.1054 3.73478 15 4 15H28C28.2652 15 28.5196 15.1054 28.7071 15.2929C28.8946 15.4804 29 15.7348 29 16C29 16.2652 28.8946 16.5196 28.7071 16.7071C28.5196 16.8946 28.2652 17 28 17Z" />
            </g>
            <defs>
              <clipPath id="clip0_501_697">
                <rect width="32" height="32" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button ref={nextSlide} className="user-posts__slider-btn user-posts__slider-btn--next">
          <svg
            className="user-posts__slider-btn-icon"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_501_697)">
              <path d="M18.9999 25.9999C18.8683 26.0007 18.7379 25.9755 18.616 25.9257C18.4942 25.8759 18.3834 25.8026 18.2899 25.7099C18.1962 25.617 18.1218 25.5064 18.071 25.3845C18.0203 25.2627 17.9941 25.132 17.9941 24.9999C17.9941 24.8679 18.0203 24.7372 18.071 24.6154C18.1218 24.4935 18.1962 24.3829 18.2899 24.2899L26.5899 15.9999L18.2899 7.70994C18.1016 7.52164 17.9958 7.26624 17.9958 6.99994C17.9958 6.73364 18.1016 6.47825 18.2899 6.28994C18.4782 6.10164 18.7336 5.99585 18.9999 5.99585C19.2662 5.99585 19.5216 6.10164 19.7099 6.28994L28.7099 15.2899C28.8037 15.3829 28.8781 15.4935 28.9288 15.6154C28.9796 15.7372 29.0057 15.8679 29.0057 15.9999C29.0057 16.132 28.9796 16.2627 28.9288 16.3845C28.8781 16.5064 28.8037 16.617 28.7099 16.7099L19.7099 25.7099C19.6165 25.8026 19.5057 25.8759 19.3838 25.9257C19.262 25.9755 19.1315 26.0007 18.9999 25.9999Z" />
              <path d="M28 17H4C3.73478 17 3.48043 16.8946 3.29289 16.7071C3.10536 16.5196 3 16.2652 3 16C3 15.7348 3.10536 15.4804 3.29289 15.2929C3.48043 15.1054 3.73478 15 4 15H28C28.2652 15 28.5196 15.1054 28.7071 15.2929C28.8946 15.4804 29 15.7348 29 16C29 16.2652 28.8946 16.5196 28.7071 16.7071C28.5196 16.8946 28.2652 17 28 17Z" />
            </g>
            <defs>
              <clipPath id="clip0_501_697">
                <rect width="32" height="32" />
              </clipPath>
            </defs>
          </svg>
        </button>
        {posts &&
          posts.rows.map((post) => (
            <SwiperSlide key={post.id}>
              <UserPost post={post} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
