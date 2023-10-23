import { ROUTES_PATH } from '@Constants/routes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import loginBackground from '../assets/icons/albumCover/login.png';

const Login = () => {
  return (
    <>
      <LoginLayout>
        <BackgroundImage />
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

export const StartBtn = styled.div`
  width: 333px;
  height: 52px;
  padding: 14px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--Primary, #2f2f2f);
  font-size: 20px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
