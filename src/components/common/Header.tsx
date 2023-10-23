import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

interface Props {
  children: ReactNode;
}

const Header = ({ children }: Props) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;

const StyledHeader = styled.div`
  padding: 10px 21px;
  background-color: white;
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
