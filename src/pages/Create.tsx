import styled from 'styled-components';
import BackIcon from '@Assets/icons/BackIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ROUTES_PATH } from '@Constants/routes';
import Input from '@Components/common/Input';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import First from '../assets/icons/albumCover/First.png';
import Second from '../assets/icons/albumCover/Second.png';
import Third from '../assets/icons/albumCover/Third.png';
import Fourth from '../assets/icons/albumCover/Fourth.png';
import Fifth from '../assets/icons/albumCover/Fifth.png';
import CompleteBtn from '@Assets/icons/CompleteBtn';

const Create = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isSubTitleEmpty, setIsSubTitleEmpty] = useState(false);
  const [selectedCoverId, setSelectedCoverId] = useState(0);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetTitle = () => setTitle('');
  const resetSubTitle = () => setSubTitle('');
  const toHome = () => navigate(ROUTES_PATH.main);

  const albumCovers = [First, Second, Third, Fourth, Fifth];

  const handleSubmit = async () => {
    if (isSubmitting) return;
    let hasError = false;
    setIsSubmitting(true);

    if (title.trim() === '' || title === '필수 입력입니다.') {
      setTitle('필수 입력입니다.');
      setIsTitleEmpty(true);
      hasError = true;
    }

    if (subTitle.trim() === '' || subTitle === '필수 입력입니다.') {
      setSubTitle('필수 입력입니다.');
      setIsSubTitleEmpty(true);
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axios.post(
        'https://port-0-cutalbum-back-jvpb2alnz8cuvj.sel5.cloudtype.app/user/album/write',
        null,
        {
          params: {
            title: title,
            subTitle: subTitle,
            coverIndex: selectedCoverId + 1 || 1,
          },
        },
      );
      console.log(response.data);
      toHome();
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.DefaultLayout>
      <S.CreateLayout>
        <S.Header>
          <div onClick={toHome}>
            <BackIcon color="#666666" width="20" height="20" />
          </div>
          <div onClick={handleSubmit}>
            <CompleteBtn />
          </div>
        </S.Header>
        <S.Content>
          <div>
            <S.H2>앨범 커버</S.H2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                366: {
                  slidesPerView: 2,
                },
                489: {
                  slidesPerView: 3,
                },
                645: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 5,
                },
              }}
            >
              {albumCovers.map((cover, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => setSelectedCoverId(index)}
                  style={{ opacity: selectedCoverId === index ? 1 : 0.3 }}
                >
                  <img src={cover} style={{ width: '130px', height: '150px' }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Input
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            resetValue={resetTitle}
            placeholder="앨범명"
            label="앨범명"
            $hasError={isTitleEmpty}
            onFocus={() => {
              if (title === '필수 입력입니다.') {
                setTitle('');
              }
              setIsTitleEmpty(false);
            }}
          />

          <Input
            value={subTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubTitle(e.target.value)}
            resetValue={resetSubTitle}
            placeholder="부제목"
            label="부제목"
            $hasError={isSubTitleEmpty}
            onFocus={() => {
              if (subTitle === '필수 입력입니다.') {
                setSubTitle('');
              }
              setIsSubTitleEmpty(false);
            }}
          />
        </S.Content>
      </S.CreateLayout>
    </S.DefaultLayout>
  );
};

export default Create;

const S = {
  DefaultLayout: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: antiquewhite;
  `,
  CreateLayout: styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    max-width: 768px;
  `,
  Header: styled.div`
    width: 100%;
    height: 52px;
    padding: 10px 17px 10px 21px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 30px 20px 0 20px;

    .swiper-slide {
      width: 0px;

      cursor: pointer;
    }
  `,
  H2: styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1.02rem;
  `,
  Cover: styled.div`
    display: flex;
    gap: 1.15rem;

    overflow-x: scroll;
  `,
  CoverDiv: styled.div<{ $isSelected?: boolean }>`
    border: ${(props) => (props.$isSelected ? '3px solid blue' : 'none')};
    transition: border 0.3s;

    &:hover {
      cursor: pointer;
    }
  `,
  InputContainer: styled.div`
    margin-bottom: 4.1rem;
    position: relative;
  `,
};
