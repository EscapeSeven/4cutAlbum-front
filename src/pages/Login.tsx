import { ROUTES_PATH } from '@Constants/routes';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import loginBackground from '../assets/icons/albumCover/login.png';

const Login = () => {
  return (
    <>
      <LoginLayout>
        <BackgroundImage></BackgroundImage>

        <Link to={ROUTES_PATH.main}>
          <QrStartBtn>QR CODE</QrStartBtn>
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
  max-width: 768px;
  padding-top: 44px;
  background-image: url(${loginBackground});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  @media screen and (max-width: 768px) {
  }
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

export const QrStartBtn = styled.div`
  width: 333px;
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--Primary, #2f2f2f);
  font-size: 20px;
  font-weight: 600;
  transition: transform 1s ease-in-out;
  margin: auto;
  margin-top: 650px;
  color: white;
  cursor: pointer;

  &:hover {
    animation: ${pulseAnimation} 1s ease infinite;
  }
`;

export const StartBtn = styled.div`
  width: 333px;
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--Primary, #2f2f2f);
  font-size: 20px;
  font-weight: 600;
  transition: transform 1s ease-in-out;
  margin: auto;
  margin-top: 30px;
  color: white;
  cursor: pointer;

  &:hover {
    animation: ${pulseAnimation} 1s ease infinite;
  }
`;
