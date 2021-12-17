import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #E52E4D;
    --blue: #5429CC;
    --blue-light: #6933FF;
    --green: #33CC95;

    --shape: #FFFFFF;
    --background: #F0F2F5;
    --title: #363F5F;
    --text: #969CB2;

    --shadow:  1px 1px 4px 3px rgba(0,0,0,0.18);
    --radius: 5px;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body, html {
    font-family: 'Poppins', sans-serif;
    background: var(--background);

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 600;
    }

    @media(max-width:1024px) {
      font-size: 93.75%;
    }

    @media(max-width:860px) {
      font-size: 87.5%;
    }

    button {
      cursor: pointer;
      border-width: 0;
    }

    img {
      width: auto;
    }

    [disabled] {
      cursor: not-allowed;
      filter: brightness(0.68);
    }
  }
`;