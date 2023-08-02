import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    padding: 0;
    margin: 0;
    -webkit-app-region: drag;
  }

  * {
    box-sizing: border-box;
  }
`;
