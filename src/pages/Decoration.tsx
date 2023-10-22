import React, { useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components';
import { useRef } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { STICKER_IMAGES } from '@Constants/stickerImage';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

type Stickers = {
  id: string;
  imageUrl: string;
  position: { x: number; y: number };
};

const Decoration = () => {
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
    const x_random = Math.random() * -280;
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
      const canvas = await html2canvas(div, { scale: 1 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'result.png');
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
        <DecorationField ref={divRef}>
          <img src="assets/먼지.jpg" />
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
                      <img src="assets/removeIcon.png" />
                    </RemoveButton>
                  )}
                  <StyledSticker name="sticker" imageUrl={sticker.imageUrl} />
                </StyledSelectedSticker>
              </Draggable>
            );
          })}
        </DecorationField>
        <button onClick={handleDownload}>다운로드</button>
        <BottomSheet
          open
          ref={sheetRef}
          blocking={false}
          snapPoints={({ maxHeight }) => [
            maxHeight / 3, //최소
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
                  imageUrl={image}
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
  max-width: 768px;
  margin: auto;
`;

const DecorationField = styled.div`
  padding: 60px;
`;

const StyledSelectedSticker = styled.div<{ name: string; editMode: boolean }>`
  position: absolute;
  bottom: 80%;
  right: 0;
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-style: dashed;
  border-color: black;
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
  /* border: 1px solid black; */
  padding: 0;
  height: 40px;
  background-image: url(${(props) => props.imageUrl});
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
