import React from 'react';
import styled from 'styled-components';
import color from '@Styles/color';
import useQrCodeAction from '@Components/qrcode/hooks/useQrCodeAction';

const QrCodeContents = () => {
  const { url, handleDownload, onMove } = useQrCodeAction();

  return (
    <>
      <img src={url} />
      <ButtonWrapper>
        <Button onClick={handleDownload}>영상/사진 다운받기</Button>
        <Button onClick={onMove}>Home으로 이동</Button>
      </ButtonWrapper>
    </>
  );
};

export default QrCodeContents;
const Layout = styled.div`
  //display: flex;
  //flex-direction: column;
  //justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //justify-content: center;
  padding: 0 21px;
  margin-bottom: 70px;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  color: ${color.btn};
  background-color: ${color.primary};
  border-radius: 8px;
  font-size: 20px;
`;
