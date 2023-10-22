import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useImageUpload from '@Pages/IndividualPage/hooks/useImageUpload';
import People from '@Assets/icons/People';
import color from '@Styles/color';
import DownIcon from '@Assets/icons/DownIcon';
import PreArrow from '@Assets/icons/PreArrow';
import sampleImg from './image.png';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { ROUTES_PATH } from '@Constants/routes';
import SwiperCore from 'swiper';
import PlusIcon from '@Assets/icons/PlusIcon'; // 타입지정을 위해 필요하다.

const Individual = () => {
  const navigate = useNavigate();

  const { albumPhotos, imgURL, selectImg, onSubmit, isImgUpload, stickerPhoto } = useImageUpload();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const [currentSlide, setCurrentSlide] = useState<number>(12);

  const handleImgClick = () => {
    imgUploadInput.current?.click();
  };

  const handlePhotoClick = (photoId: number | undefined) => {
    if (!photoId) return;
    navigate(`${ROUTES_PATH.decoration}/${photoId}`);
  };

  const handleButtonClick = () => {
    if (!isImgUpload) {
      handleImgClick();
    } else {
      onSubmit();
    }
  };

  return (
    <DefaultLayout>
      <Layout>
        <Header>
          <LeftSide>
            <Link to={ROUTES_PATH.main}>
              <PreArrow />
            </Link>
          </LeftSide>
          <RightSide>
            <div onClick={handleImgClick}>
              <PlusIcon />
            </div>
            <DownIcon />
            <People />
          </RightSide>
        </Header>
        <Content>
          {albumPhotos?.length === 0 ? (
            <SlideImg src={imgURL ? imgURL : sampleImg} onClick={handleImgClick} />
          ) : (
            <>
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
                  </SwiperSlide>
                ))}
              </Swiper>
              <button>라이크버튼</button>
            </>
          )}
        </Content>
        <Footer>
          {albumPhotos?.length === 0 ? (
            <Button onClick={() => handleButtonClick()}>{isImgUpload ? '앨범에 추가' : '사진 선택'}</Button>
          ) : (
            <Button onClick={() => handlePhotoClick(albumPhotos?.[currentSlide].id)}>꾸미기</Button>
          )}
        </Footer>
        {/*<input*/}
        {/*  type="file"*/}
        {/*  accept="image/*"*/}
        {/*  required*/}
        {/*  ref={imgUploadInput}*/}
        {/*  onChange={selectImg}*/}
        {/*  style={{ display: 'none' }}*/}
        {/*/>*/}
      </Layout>
    </DefaultLayout>
  );
};

const DefaultLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: antiquewhite;
  min-height: 100vh;
`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  width: 100%;
  height: 52px;
  padding: 0 17px 0 21px;

  display: flex;
  justify-content: space-between;
`;

const LeftSide = styled.div``;
const RightSide = styled.div`
  display: flex;
  gap: 12px;
`;

const Content = styled.div`
  width: 100%;
`;

const SlideImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //background-image: url('/assets/photo_background.png');
`;

const SlideImg = styled.img`
  width: fit-content;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 21px;
  margin-bottom: 70px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  color: ${color.btn};
  background-color: ${color.primary};
  border-radius: 8px;
  font-size: 20px;
`;

const PlusLikeBtn = styled.div`
  width: 375px;
  height: 56px;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default Individual;
