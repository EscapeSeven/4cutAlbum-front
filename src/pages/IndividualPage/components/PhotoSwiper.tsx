import SwiperCore from 'swiper';
import React, { Dispatch, useState } from 'react';
import useImageUpload, { AlbumPhotos } from '@Pages/IndividualPage/hooks/useImageUpload';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styled from 'styled-components';
import LikeButton from '@Pages/IndividualPage/components/LikeButton';
import color from '@Styles/color';

type Props = {
  albumPhotos: AlbumPhotos[] | null;
  currentSlide: number;
};

const PhotoSwiper = ({ albumPhotos, currentSlide }: Props) => {
  return (
    <Layout>
      <Swiper
        autoHeight={true}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        initialSlide={currentSlide}
        navigation={true}
      >
        {albumPhotos?.map((photo) => (
          <SwiperSlide key={photo.id}>
            <SlideImgWrapper>
              <SlideImg src={photo.imageUrl} />
              <PhotoDate>{photo.createdDate}</PhotoDate>
            </SlideImgWrapper>
            <LikeButton likes={photo.likes} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
};

export default PhotoSwiper;

const Layout = styled.div`
  height: 450px;
  .swiper-button-next,
  .swiper-button-prev {
    color: #1c1c1c80;
  }
`;

const PhotoDate = styled.div`
  font-size: 16px;
  color: ${color.gray[600]};
  text-align: right;
  width: 256px;
  margin-left: auto;
  margin-right: auto;
`;

const SlideImgWrapper = styled.div`
  height: 450px;
  display: flex;
  flex-direction: column;
  background-image: url('/assets/background.png');
  justify-content: center;
  /* align-items: center; */
`;

const SlideImg = styled.img`
  width: 256px;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
`;
