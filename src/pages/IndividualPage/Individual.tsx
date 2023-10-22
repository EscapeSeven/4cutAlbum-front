import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useImageUpload from '@Pages/IndividualPage/hooks/useImageUpload';
import People from '@Assets/icons/People';
import color from '@Styles/color';
import DownIcon from '@Assets/icons/DownIcon';
import PreArrow from '@Assets/icons/PreArrow';
import sampleImg from './image.png';
import { ROUTES_PATH } from '@Constants/routes';
import PlusIcon from '@Assets/icons/PlusIcon';
import PhotoSwiper from '@Pages/IndividualPage/components/PhotoSwiper';

const Individual = () => {
  const navigate = useNavigate();
  const initial_slide = 12;

  const { albumPhotos, imgURL, selectImg, onSubmit, isImgUpload, stickerPhoto } = useImageUpload();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(initial_slide);

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
          {albumPhotos?.length === 0 || isImgUpload ? (
            <img src={imgURL ? imgURL : sampleImg} onClick={handleImgClick} />
          ) : (
            <>
              <PhotoSwiper albumPhotos={albumPhotos} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            </>
          )}
        </Content>
        <ButtonWrapper>
          {albumPhotos?.length === 0 || isImgUpload ? (
            <Button onClick={() => handleButtonClick()}>{isImgUpload ? '앨범에 추가' : '사진 선택'}</Button>
          ) : (
            <Button onClick={() => handlePhotoClick(albumPhotos?.[currentSlide].id)}>꾸미기</Button>
          )}
        </ButtonWrapper>
        <input
          type="file"
          accept="image/*"
          required
          ref={imgUploadInput}
          onChange={selectImg}
          style={{ display: 'none' }}
        />
      </Layout>
    </DefaultLayout>
  );
};

const DefaultLayout = styled.div`
  background-color: antiquewhite;
`;

const Layout = styled.div`
  height: 100vh;
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
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
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
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
