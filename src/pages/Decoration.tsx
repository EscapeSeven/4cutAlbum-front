import React, { useRef, useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { STICKER_IMAGES } from '@Constants/stickerImage';
import html2canvas from 'html2canvas';
import removeIcon from '@Assets/icons/removeIcon.png';
import { useNavigate } from 'react-router-dom';
import color from '@Styles/color';
import BackIcon from '@Assets/icons/BackIcon';
import { ROUTES_PATH } from '@Constants/routes';
import useDecorationInfo from '@Pages/hooks/useDecorationInfo';

type Stickers = {
  id: string;
  imageUrl: string;
  position: { x: number; y: number };
};

const Decoration = () => {
  const { photo, onSubmitDecoPhoto } = useDecorationInfo();

  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [stickers, setStickers] = useState<Stickers[]>([]);
  const [isClickedId, setIsClickedId] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const handleOnDrag = (data: DraggableData, id: string) => {
    const findIndex = stickers.findIndex((item) => item.id === id);
    const copiedStickers = [...stickers];
    copiedStickers[findIndex].position = {
      x: data.x,
      y: data.y,
    };
    setStickers(copiedStickers);
  };

  const removeSticker = (id: string) => {
    const findIndex = stickers.findIndex((item) => item.id === id);
    const copiedStickers = [...stickers];
    copiedStickers.splice(findIndex, 1);
    setStickers(copiedStickers);
  };

  const putSticker = (imageUrl: string) => {
    const uuid = uuidv4();
    const x_random = Math.random() * (-180 - 100) + 150;
    const y_random = Math.random() * 100;
    const sticker = {
      id: uuid,
      imageUrl,
      position: {
        x: x_random,
        y: y_random,
      },
    };
    setStickers(stickers.concat(sticker));
  };

  const handleDownload = async () => {
    if (!divRef.current) return;
    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 1,
        allowTaint: true,
        useCORS: true,
      });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          onSubmitDecoPhoto(blob);
          navigate(`${ROUTES_PATH.individual}/1`);
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  const cancelEditMode = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    const name = element.getAttribute('name');
    if (name !== 'sticker') {
      setIsClickedId('');
    }
  };

  return (
    <>
      <MainContainer onClick={cancelEditMode}>
        <Header>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon color="#666666" width="20" height="20" />
          </button>
          <CompleteButton onClick={handleDownload}>완료</CompleteButton>
        </Header>
        <DecorationField ref={divRef}>
          <PhotoImage src={photo?.imageUrl} />
          <PhotoDate>{photo?.createdDate}</PhotoDate>
          {stickers.map((sticker) => {
            return (
              <Draggable
                key={sticker.id}
                position={{
                  x: sticker.position.x,
                  y: sticker.position.y,
                }}
                onDrag={(_, data) => handleOnDrag(data, sticker.id)}
                onMouseDown={() => {
                  setIsClickedId(sticker.id);
                }}
              >
                <StyledSelectedSticker name="sticker" className="box" editMode={sticker.id === isClickedId}>
                  {sticker.id === isClickedId && (
                    <RemoveButton
                      onClick={() => removeSticker(sticker.id)}
                      // onPointerEnter={() => removeSticker(sticker.id)}
                    >
                      <img src={removeIcon} />
                    </RemoveButton>
                  )}
                  <StyledSticker name="sticker" imageUrl={`/assets/stickers/${sticker.imageUrl}`} />
                </StyledSelectedSticker>
              </Draggable>
            );
          })}
        </DecorationField>
        {/* <button onClick={handleDownload}>완료</button> */}
        <BottomSheet
          open
          ref={sheetRef}
          blocking={false}
          snapPoints={({ maxHeight }) => [
            maxHeight / 2.3, //최소
            maxHeight / 1.1, //최대
          ]}
        >
          <StyledStickerWrapper>
            {STICKER_IMAGES.map((image, index) => {
              return (
                <StyledSticker
                  key={index}
                  onClick={() => {
                    putSticker(image);
                  }}
                  imageUrl={`/assets/stickers/${image}`}
                />
              );
            })}
          </StyledStickerWrapper>
        </BottomSheet>
      </MainContainer>
    </>
  );
};

export default Decoration;

const MainContainer = styled.div`
  max-width: 375px;
  margin: auto;
  max-height: 450px;
`;

const Header = styled.div`
  padding: 10px 21px;
  background-color: white;
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompleteButton = styled.button`
  color: #666666;
  font-size: 16px;
`;

const PhotoImage = styled.img`
  margin: auto;
`;

const PhotoDate = styled.div`
  font-size: 16px;
  color: ${color.gray[600]};
  text-align: right;
`;

const DecorationField = styled.div`
  padding: 33px 60px;
  position: relative;
  max-height: 450px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  background-image: url('/assets/background.png');
`;

const StyledSelectedSticker = styled.div<{ name: string; editMode: boolean }>`
  position: absolute;
  bottom: 50%;
  right: 50%;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-style: dashed;
  border-color: #636363;
  border-width: ${(props) => (props.editMode ? '1px' : '0')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  right: -8px;
  top: -22px;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const StyledStickerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 4px;
`;

const StyledSticker = styled.button<{ imageUrl: string }>`
  width: 40px;
  padding: 0;
  height: 40px;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-size: 100%;
`;

/*
import { ChangeEventHandler, useCallback } from 'react';


const useInput = (validateOption: boolean) => {
  const [state, setInputState] = useState<string>('');
  const [isInputError, setIsInputError] = useState<boolean>(false);

  // React.MouseEvent<HTMLButtonElement>
  const onChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (
        (validateOption && (value.length < 1 || value.length > 10)) ||
        (validateOption && value.trim().length === 0)
      ) {
        return setIsInputError(true);
      }

      setInputState(e.target.value);

      if (validateOption) {
        setIsInputError(false);
      }
    },
    [setInputState, validateOption],
  );
  return { state, isInputError, onChangeInput };
};

export default useInput;
*/
