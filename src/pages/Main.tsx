import { ROUTES_PATH } from '@Constants/routes';
import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import First from '../assets/icons/albumCover/First.png';
import Second from '../assets/icons/albumCover/Second.png';
import Third from '../assets/icons/albumCover/Third.png';
import AlbumNull from '@Assets/icons/albumCover/album_null.png';
import Fourth from '../assets/icons/albumCover/Fourth.png';
import Fifth from '../assets/icons/albumCover/Fifth.png';
import setting from '../assets/icons/albumCover/setting.png';
import correction from '../assets/icons/albumCover/correction.png';
import Header from '@Components/common/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import color from '@Styles/color';

interface Album {
  id: number;
  title: string;
  subTitle: string;
  imageUrl: string;
  coverIndex: number;
}

const Main = () => {
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get('https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app/user/albums')
      .then((response) => {
        setUserAlbums(response.data.data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, []);

  const handleImageClick = () => {
    alert('개발 중 입니다!');
  };

  const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = AlbumNull;
  };

  return (
    <>
      <Wrapper>
        <MainLayout>
          <Header>
            <Setting src={setting} alt="설정 버튼" onClick={handleImageClick}></Setting>
            <Correction src={correction} alt="수정 버튼" onClick={handleImageClick}></Correction>
          </Header>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            breakpoints={{
              375: {
                slidesPerView: 1.4,
              },
              443: {
                slidesPerView: 1.8,
              },
              768: {
                slidesPerView: 2.3,
              },
            }}
            centeredSlides={true}
            pagination={{
              type: 'fraction',
            }}
            navigation={true}
          >
            {userAlbums.length > 0 ? (
              userAlbums.map((userAlbum) => (
                <SwiperSlide key={userAlbum.id}>
                  <Album>
                    <AlbumTitle>{userAlbum.title}</AlbumTitle>
                    <AlbumSubtitle>{userAlbum.subTitle}</AlbumSubtitle>
                    <AlbumBackground>
                      <Link to={`${ROUTES_PATH.individual}/${userAlbum.id}`}>
                        <AlbumImage
                          src={
                            userAlbum.coverIndex === 1
                              ? First
                              : userAlbum.coverIndex === 2
                              ? Second
                              : userAlbum.coverIndex === 3
                              ? Third
                              : userAlbum.coverIndex === 4
                              ? Fourth 
                              : userAlbum.coverIndex === 5
                              ? Fifth
                              : AlbumNull
                          }
                          alt="앨범 이미지"
                          onError={handleImgError}
                        />
                      </Link>
                    </AlbumBackground>
                  </Album>
                </SwiperSlide>
              ))
            ) : (
              <>
                <AlbumTitle margin={97}>새로운 앨범</AlbumTitle>
                <AlbumSubtitle>당신의 추억을 저장하세요</AlbumSubtitle>
                <EmptyAlbumScreen />
              </>
            )}
          </Swiper>
          <Link to={ROUTES_PATH.create}>
            <AlbumAddButton />
          </Link>
        </MainLayout>
      </Wrapper>
    </>
  );
};

export default Main;

export const Wrapper = styled.div`
  background-color: antiquewhite;
`;

export const MainLayout = styled.div`
  height: 100vh;
  margin: auto;
  position: relative;
  background-color: white;
  max-width: 768px;

  .swiper-button-next,
  .swiper-button-prev {
    color: #1c1c1c80;
    margin-top: 50px;
  }

  .swiper-pagination {
    color: var(--grayscales-gray-66, #666);
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    position: relative;
    border: 1px solid ${color.gray[500]};
    border-radius: 50px;
    padding: 2px 4px;
    width: 70px;
    margin: auto;
    letter-spacing: 0px;
  }
`;

export const Setting = styled.img`
  width: 32px;
  cursor: pointer;
`;

export const Correction = styled.img`
  width: 32px;
  cursor: pointer;
`;

export const Album = styled.div`
  margin: auto;
  position: relative;
`;

export const AlbumImage = styled.img`
  width: 260px;
`;

export const AlbumTitle = styled.div<{ margin?: number }>`
  color: var(--grayscales-gray-1-c, #1c1c1c);
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-top: ${(props) => (props.margin ? props.margin : 57)}px;
`;

export const AlbumSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: center;
  color: ${color.gray[500]};
`;

// hover animation
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
`;

export const AlbumBackground = styled.div`
  margin: 32px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    animation: ${pulseAnimation} 1s ease infinite;
  }
`;

export const AlbumAddButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: #2f2f2f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: flex;
  bottom: 60px;
  left: 80%;
  transform: translateX(-50%);
  transition: background-color 0.2s ease;
  z-index: 9;

  & span {
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 50px;
    position: absolute;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: white;
  }

  &::before {
    top: 35%;
    left: 50%;
    width: 2.8px;
    height: 24px;
    margin-left: -1px;
    border-radius: 5px;
  }

  &::after {
    top: 50%;
    left: 35%;
    width: 24px;
    height: 2.8px;
    margin-top: -1px;
    border-radius: 5px;
  }

  &:hover {
    background-color: #bbb;
  }
`;

export const EmptyAlbumScreen = styled.div`
  margin: 32px auto;
  width: 260px;
  height: 300px;
  background-image: url(${require('/assets/icons/albumCover/album_null.png')});
  background-size: contain;
  background-repeat: no-repeat;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
