import axios from 'axios';
import BackIcon from '@Assets/icons/BackIcon';
import CompleteBtn from '@Assets/icons/CompleteBtn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '@Constants/routes';
import Input from '@Components/common/Input';
import Header from '@Components/common/Header';
import { S } from '@Styles/create';
import { ValidateInput, FocusType } from '@Types/create';
import { ERROR_MESSAGES, API_ENDPOINTS, ICON_PROPERTIES, DEFAULT_COVER_INDEX } from '@Constants/create';
import { AlbumCover } from './AlbumCover';
import { useAlbumName } from '@Pages/hooks/useAlbumName';

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

  const validateInput: ValidateInput = (input, errorSetter, errorMessage) => {
    if (input.trim() === '' || input === errorMessage) {
      errorSetter(true);
      return false;
    }
    errorSetter(false);
    return true;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const isTitleValid = validateInput(title, setIsTitleEmpty, ERROR_MESSAGES.TITLE);
    const isSubTitleValid = validateInput(subTitle, setIsSubTitleEmpty, ERROR_MESSAGES.SUBTITLE);

    if (!isTitleValid) updateTitle(ERROR_MESSAGES.TITLE);

    if (!isSubTitleValid) updateSubTitle(ERROR_MESSAGES.SUBTITLE);

    if (!isTitleValid || !isSubTitleValid) {
      setIsSubmitting(false);
      return;
    }
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.DefaultLayout>
      <S.CreateLayout>
        <Header>
          <button onClick={toHome}>
            <BackIcon
              color={ICON_PROPERTIES.BACK_ICON.COLOR}
              width={ICON_PROPERTIES.BACK_ICON.WIDTH.toString()}
              height={ICON_PROPERTIES.BACK_ICON.HEIGHT.toString()}
            />
          </button>
          <button onClick={handleSubmit}>
            <CompleteBtn />
          </button>
        </Header>
        <S.Content>
          <AlbumCover selectedCoverId={selectedCoverId} setSelectedCoverId={setSelectedCoverId} />
          <Input
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            resetValue={() => updateTitle('')}
            placeholder="앨범명"
            label="앨범명"
            $hasError={isTitleEmpty}
            onFocus={() => handleFocus('title')}
          />
          <Input
            value={subTitle}
            onChange={(e) => updateSubTitle(e.target.value)}
            resetValue={() => updateSubTitle('')}
            placeholder="부제목"
            label="부제목"
            $hasError={isSubTitleEmpty}
            onFocus={() => handleFocus('subTitle')}
          />
        </S.Content>
      </S.CreateLayout>
    </S.DefaultLayout>
  );
};

export default Create;
