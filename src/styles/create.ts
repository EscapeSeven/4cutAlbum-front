import styled from 'styled-components';
import { CoverDivProps } from '@Types/create';

export const S = {
  DefaultLayout: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: antiquewhite;
  `,
  CreateLayout: styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    max-width: 768px;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 30px 20px 0 20px;

    .swiper-slide {
      width: 0px;

      cursor: pointer;
    }
  `,
  H2: styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1.02rem;
  `,
  Cover: styled.div`
    display: flex;
    gap: 1.15rem;

    overflow-x: scroll;
  `,
  CoverDiv: styled.div<CoverDivProps>`
    border: ${(props) => (props.$isSelected ? '3px solid blue' : 'none')};
    transition: border 0.3s;

    &:hover {
      cursor: pointer;
    }
  `,
  InputContainer: styled.div`
    margin-bottom: 4.1rem;
    position: relative;
  `,
};
