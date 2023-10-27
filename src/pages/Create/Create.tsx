import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '@Constants/routes';
import Header from '@Components/common/Header';
import { FocusType } from '@Types/create';
import { ERROR_MESSAGES, API_ENDPOINTS, DEFAULT_COVER_INDEX } from '@Constants/create';
import { AlbumCover } from '../../components/create/AlbumCover';
import { useAlbumName } from '@Pages/hooks/useAlbumName';
import styled from 'styled-components';
import color from '@Styles/color';
import { validateInput } from '@Utils/createUtils';
import AlbumCreationForm from '@Components/create/AlbumCreationForm';
import NavigationButtons from '@Components/create/NavigationButtons';

const Create = () => {
  const {
    title,
    subTitle,
    isTitleEmpty,
    isSubTitleEmpty,
    updateTitle,
    updateSubTitle,
    setIsTitleEmpty,
    setIsSubTitleEmpty,
  } = useAlbumName();

  const [selectedCoverId, setSelectedCoverId] = useState(0);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toHome = () => navigate(ROUTES_PATH.main);

  const handleFocus = (type: FocusType) => {
    if (type === 'title' && isTitleEmpty) {
      updateTitle('');
      setIsTitleEmpty(false);
    }
    if (type === 'subTitle' && isSubTitleEmpty) {
      updateSubTitle('');
      setIsSubTitleEmpty(false);
    }
  };

  const validateInputs = () => {
    const trimmedTitle = title.trim();
    const trimmedSubTitle = subTitle.trim();

    const isTitleValid = validateInput(trimmedTitle, setIsTitleEmpty, ERROR_MESSAGES.TITLE);
    if (!isTitleValid) updateTitle(ERROR_MESSAGES.TITLE);

    const isSubTitleValid = validateInput(trimmedSubTitle, setIsSubTitleEmpty, ERROR_MESSAGES.SUBTITLE);
    if (!isSubTitleValid) updateSubTitle(ERROR_MESSAGES.SUBTITLE);

    return isTitleValid && isSubTitleValid;
  };

  const createAlbum = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.ALBUM_WRITE, null, {
        params: {
          title,
          subTitle,
          coverIndex: selectedCoverId + DEFAULT_COVER_INDEX,
        },
      });
      console.log(response.data);
      toHome();
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const areInputsValid = validateInputs();
    if (!areInputsValid) {
      setIsSubmitting(false);
      return;
    }

    await createAlbum();

    setIsSubmitting(false);
  };

  return (
    <S.DefaultLayout>
      <S.CreateLayout>
        <Header>
          <NavigationButtons toHome={toHome} handleSubmit={handleSubmit} />
        </Header>
        <S.Content>
          <AlbumCover selectedCoverId={selectedCoverId} setSelectedCoverId={setSelectedCoverId} />
          <AlbumCreationForm
            title={title}
            subTitle={subTitle}
            isTitleEmpty={isTitleEmpty}
            isSubTitleEmpty={isSubTitleEmpty}
            updateTitle={updateTitle}
            updateSubTitle={updateSubTitle}
            handleFocus={handleFocus}
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
    background-color: ${color.white};
    max-width: 768px;
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
  Cover: styled.div`
    display: flex;
    gap: 1.15rem;

    overflow-x: scroll;
  `,

  InputContainer: styled.div`
    margin-bottom: 4.1rem;
    position: relative;
  `,
};
