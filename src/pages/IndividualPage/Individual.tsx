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
import Header from '@Components/common/Header';

const Individual = () => {
  const { currentSlide, handleCurrentSlide, albumPhotos, imgURL, selectImg, onSubmit, isImgUpload, handlePhotoClick } =
    useImageUpload();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const handleImgClick = () => {
    imgUploadInput.current?.click();
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
            <button onClick={handleImgClick}>
              <PlusIcon />
            </button>
            <DownIcon />
            <People />
          </RightSide>
        </Header>
        <Content>
          {albumPhotos?.length === 0 || isImgUpload ? (
            <img src={imgURL ? imgURL : sampleImg} onClick={handleImgClick} />
          ) : (
            <>
              <PhotoSwiper albumPhotos={albumPhotos} currentSlide={currentSlide} />
            </>
          )}
        </Content>
        {albumPhotos?.length === 0 || isImgUpload ? (
          <Button onClick={() => handleButtonClick()}>{isImgUpload ? '앨범에 추가' : '사진 선택'}</Button>
        ) : (
          <Button onClick={() => handlePhotoClick(albumPhotos?.[currentSlide].id)}>꾸미기</Button>
        )}
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
  background-color: white;
  position: relative;
`;

const LeftSide = styled.div``;
const RightSide = styled.div`
  display: flex;
`;

const Content = styled.div``;

const Button = styled.button`
  width: 90%;
  height: 52px;
  color: ${color.btn};
  background-color: ${color.primary};
  border-radius: 8px;
  font-size: 20px;
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translate(-50%, -50%);
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
