// Create 컴포넌트에서 앨범명, 부제목 작성에 사용합니다.
import { useState } from 'react';
import { ERROR_MESSAGES } from '@Constants/create';

export const useAlbumName = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isSubTitleEmpty, setIsSubTitleEmpty] = useState(false);

  const updateTitle = (value: string) => {
    setTitle(value);
    if (value.trim() === '' || value === ERROR_MESSAGES.TITLE) {
      setIsTitleEmpty(true);
    } else {
      setIsTitleEmpty(false);
    }
  };

  const updateSubTitle = (value: string) => {
    setSubTitle(value);
    if (value.trim() === '' || value === ERROR_MESSAGES.SUBTITLE) {
      setIsSubTitleEmpty(true);
    } else {
      setIsSubTitleEmpty(false);
    }
  };

  return {
    title,
    subTitle,
    isTitleEmpty,
    isSubTitleEmpty,
    updateTitle,
    updateSubTitle,
    setTitle,
    setSubTitle,
    setIsTitleEmpty,
    setIsSubTitleEmpty,
  };
};
