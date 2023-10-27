import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ALBUM_COVER_IMAGES, SLIDER_BREAKPOINTS } from '@Constants/create';
import styled from 'styled-components';

type AlbumCoverProps = {
  selectedCoverId: number;
  setSelectedCoverId: (index: number) => void;
};

export const AlbumCover = ({ selectedCoverId, setSelectedCoverId }: AlbumCoverProps) => (
  <div>
    <H2>앨범 커버</H2>
    <Swiper modules={[Navigation, Pagination]} spaceBetween={10} breakpoints={SLIDER_BREAKPOINTS}>
      {ALBUM_COVER_IMAGES.map((cover, index) => (
        <SwiperSlide
          key={index}
          onClick={() => setSelectedCoverId(index)}
          style={{ opacity: selectedCoverId === index ? 1 : 0.3 }}
        >
          <img src={cover} alt="앨범 커버" style={{ width: '130px', height: '150px' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1.02rem;
`;
