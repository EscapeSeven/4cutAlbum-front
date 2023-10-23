import { ROUTES_PATH } from '@Constants/routes';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import loginBackground from '../assets/icons/albumCover/login.png';

const Login = () => {
  return (
    <>
      <LoginLayout>
        <BackgroundImage></BackgroundImage>

        <Link to={ROUTES_PATH.qrcode}>
          <QrStartBtn>QR코드 찍기</QrStartBtn>
        </Link>
        <Link to={ROUTES_PATH.main}>
          <StartBtn>시작하기</StartBtn>
        </Link>
      </LoginLayout>
    </>
  );
};

export default Login;

export const Wrapper = styled.div`
  background-color: antiquewhite;
`;

export const LoginLayout = styled.div`
  height: 100vh;
  margin: auto;
  position: relative;
  background-color: white;
  min-width: 375px;
  max-width: 768px;
  padding-top: 44px;
  background-image: url(${loginBackground});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const BackgroundImage = styled.div``;

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

export const StartBtn = styled.div`
  width: 333px;
  height: 52px;
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #000000;
  background: var(--Primary, #2f2f2f);
  font-size: 20px;
  font-weight: 600;
  margin: auto;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 130px;
  left: 50%;
  transition: background-color 0.2s ease;
  transform: translate(-50%, -50%);

  &:hover {
    background: #5e5e5e;
    color: #ffffff;
  }
`;

export const QrStartBtn = styled.div`
  width: 333px;
  height: 52px;
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #000000;
  background: #ffffff;
  font-size: 20px;
  margin: auto;
  color: #2f2f2f;
  cursor: pointer;
  position: absolute;
  bottom: 70px;
  left: 50%;
  font-weight: 600;
  transition: background-color 0.2s ease;
  transform: translate(-50%, -50%);

  &:hover {
    background: #eeeeee;
    color: #414141;
  }
`;
