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

type Props = {
  albumPhotos: AlbumPhotos[] | null;
  currentSlide: number;
  setCurrentSlide: Dispatch<React.SetStateAction<number>>;
};

const PhotoSwiper = ({ albumPhotos, currentSlide, setCurrentSlide }: Props) => {
  return (
    <Layout>
      <Swiper
        autoHeight={true}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        onSlideChange={(swiper: SwiperCore) => setCurrentSlide(swiper.activeIndex)}
        initialSlide={currentSlide}
      >
        {albumPhotos?.map((photos) => (
          <SwiperSlide key={photos.id} onClick={() => console.log(currentSlide)}>
            <SlideImgWrapper>
              <SlideImg src={photos.imageUrl} />
            </SlideImgWrapper>
            <LikeButton photoId={photos.id} likes={photos.likes} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
};

export default PhotoSwiper;

const Layout = styled.div``;

const SlideImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SlideImg = styled.img`
  width: 100%;
`;
