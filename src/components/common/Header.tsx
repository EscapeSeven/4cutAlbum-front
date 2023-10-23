import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Header = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default Header;

const Layout = styled.header`
  width: 100%;
  height: 52px;
  padding: 0 17px 0 21px;

  display: flex;
  justify-content: space-between;
`;
