import { createGlobalStyle, css } from 'styled-components';

import resetStyle from './reset';

const GlobalStyles = createGlobalStyle`
  ${resetStyle}

  html {
    font-size: 62.5%;
  }

  :root {
    --rsbs-max-w: 768px;
    --rsbs-ml:  auto;
    --rsbs-mr: auto;
  }

  body {
    font-size: 1.6rem;
    font-family: "Pretendard";
    font-weight: 300;

    ${({ theme }) => css`
      color: ${theme.text};
    `}


  }
  `;

export default GlobalStyles;
