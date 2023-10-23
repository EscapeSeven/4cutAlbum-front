import { ROUTES_PATH } from '@Constants/routes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import First from '../assets/icons/albumCover/First.png';
import Second from '../assets/icons/albumCover/Second.png';
import Third from '../assets/icons/albumCover/Third.png';
import Fourth from '../assets/icons/albumCover/Fourth.png';
import Fifth from '../assets/icons/albumCover/Fifth.png';
import setting from '../assets/icons/albumCover/setting.png';
import correction from '../assets/icons/albumCover/correction.png';
import plus from '../assets/icons/albumCover/plus.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

  // console.log(userAlbums);

  const handleImageClick = () => {
    alert('개발 중 입니다!');
  };

  return (
    <>
      <Wrapper>
        <MainLayout>
          <Header>
            <Setting src={setting} alt="nav 이미지" onClick={handleImageClick}></Setting>
            <Correction src={correction} alt="nav 이미지" onClick={handleImageClick}></Correction>
          </Header>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={40}
            slidesPerView={1.4}
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
                              : userAlbum.imageUrl
                          }
                          alt="앨범 이미지"
                        />
                      </Link>
                    </AlbumBackground>
                  </Album>
                </SwiperSlide>
              ))
            ) : (
              <>
                <AlbumTitle>앨범을 만들어주세요!</AlbumTitle>
                <AlbumSubtitle>4CUT</AlbumSubtitle>
                <Link to={ROUTES_PATH.create}>
                  <EmptyAlbumScreen>+</EmptyAlbumScreen>
                </Link>
              </>
            )}
          </Swiper>
          <Link to={ROUTES_PATH.create}>
            <AlbumAddButton>
              <PlusIcon />
            </AlbumAddButton>
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
  padding-top: 44px;

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

    .swiper-pagination-bullets.swiper-pagination-horizontal {
      margin: auto;
      width: 59px;
    }
  }
`;

export const Header = styled.div`
  width: 90%;
  height: 52px;
  margin: auto;
  display: flex;
  justify-content: space-between;
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

export const AlbumTitle = styled.div`
  color: var(--grayscales-gray-1-c, #1c1c1c);
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-top: 97px;
`;

export const AlbumSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
  color: #999999;
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
  width: 250px;
  height: 290px;
  margin: 40px auto;
  padding: 10px;
  border: 2.05px solid #d2d2d2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5%;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0px 13.312px 24.576px 7.168px #00000012;
  cursor: pointer;

  &:hover {
    animation: ${pulseAnimation} 1s ease infinite;
  }
`;

export const AlbumImage = styled.img`
  width: 270px;
`;

export const AlbumAddButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #2f2f2f;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: flex;
  bottom: 60px;
  left: 80%;
  transform: translateX(-50%);
  box-shadow: 0px 4px 11px 4px #9e9e9e40;
  transition: background-color 0.2s ease;
  z-index: 1px;
  
  &:hover {
    background-color: #bbb;

    p {
      color: white;
    }
  }
`;

export const EmptyAlbumScreen = styled.div`
  width: 250px;
  height: 301px;
  margin: 40px auto;
  padding: 10px;
  border: 2.05px solid #d2d2d2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 13.312px 24.576px 7.168px rgba(0, 0, 0, 0.07);
  font-size: 80px;
  cursor: pointer;
  color: #d2d2d2;
`;

export const PlusIcon = styled.img`
  background-image: url(${plus});
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
