import styled from 'styled-components';
import Header from '@Components/common/Header';
import React, { PropsWithChildren } from 'react';
import color from '@Styles/color';

const QrCodeLayout = ({ children }: PropsWithChildren) => {
  return (
    <DefaultLayout>
      <Layout>
        <Header></Header>
        <ContentsContainer>{children}</ContentsContainer>
      </Layout>
    </DefaultLayout>
  );
};

export default QrCodeLayout;

const DefaultLayout = styled.section`
  background-color: antiquewhite;
`;

const Layout = styled.section`
  height: 100vh;
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  //justify-content: space-between;
`;

const ContentsContainer = styled.div`
  min-height: 90%;
  //background-color: blueviolet;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
