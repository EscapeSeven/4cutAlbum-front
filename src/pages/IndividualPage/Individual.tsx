import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useImageUpload from '@Pages/IndividualPage/hooks/useImageUpload';
import People from '@Assets/icons/People';
import color from '@Styles/color';
import Down from '@Assets/icons/Down';
import PreArrow from '@Assets/icons/PreArrow';
import sampleImg from './image.png';
import backgroundImg from './backgroundImg.png';
import axios from 'axios';

const Individual = () => {
  const { file, imgURL, selectImg, onSubmit, isImgUpload, stickerPhoto } = useImageUpload();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const [isImgonSubmit, setIsImgonSubmit] = useState(false);

  const handleImgClick = () => {
    imgUploadInput.current?.click();
  };

  return (
    <Layout>
      <None />
      <Header>
        <Link to="hello" onClick={() => console.log('뒤로가기!')}>
          <LeftBtn>
            <PreArrow color={color.gray[700]}></PreArrow>
          </LeftBtn>
        </Link>

        <RightBtn>
          {isImgUpload ? (
            <>
              <DownIcon isUploaded color={color.gray[700]} />
              <People color={color.gray[700]} />
            </>
          ) : (
            <>
              <DownIcon color={color.gray[400]} />
              <People color={color.gray[700]} />
            </>
          )}
        </RightBtn>
      </Header>

      <Content>
        <input
          type="file"
          accept="image/*"
          required
          ref={imgUploadInput}
          onChange={selectImg}
          style={{ display: 'none' }}
        />

        {isImgUpload ? <SampleImg src={imgURL} /> : <SampleImg src={imgURL} />}
      </Content>

      <PlusLikeBtn></PlusLikeBtn>

      <BtnWrap>
        {!isImgUpload && <Button onClick={handleImgClick}>사진 선택</Button>}

        {isImgUpload && <Button onClick={onSubmit}>사진 업로드</Button>}

        {isUploaded && !isUploaded && (
          <Button>
            <Link to="/" onClick={() => console.log('꾸미기!')}>
              꾸미기
            </Link>
          </Button>
        )}
      </BtnWrap>
    </Layout>
  );
};

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  height: 100vh;
  margin: auto;
  position: relative;
  background-color: white;
  padding-top: 44px;
  max-width: 768px;
`;

const Header = styled.div`
  /* width: 375px; */
  max-width: 768px;
  height: 52px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const None = styled.div`
  /* width: 375px; */
  height: 44px;
  background-color: white;
`;

const LeftBtn = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;

  &:hover {
    cursor: pointer;
  }
`;

const DownIcon = styled(Down)<{ isUploaded?: boolean }>`
  color: ${(props) => (props.isUploaded ? color.gray[700] : color.gray[400])};

  &:hover {
    cursor: ${(props) => (props.isUploaded ? 'pointer' : 'default')};
    color: ${(props) => (props.isUploaded ? color.gray[600] : color.gray[400])};
  }
`;

const RightBtn = styled.div`
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 80px;

  &:hover {
    cursor: pointer;
  }

  ${DownIcon}:hover {
    cursor: default;
  }
`;

const Content = styled.div`
  /* width: 375px; */
  width: 100%;
  height: 450px;
  background-color: #f6f6f6;
`;

const Info = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
`;

const SampleImg = styled.img`
  display: flex;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0px auto;

  &:hover {
    cursor: pointer;
  }
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

const BtnWrap = styled.div`
  /* width: 375px;
  height: 126px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 333px;
  height: 52px;
  color: ${color.btn};
  background-color: ${color.primary};
  font-size: 20px;
`;

const ImgUpload = styled.img`
  width: 80%;
`;

const ImgInput = styled.input`
  display: none;
`;

export default Individual;
