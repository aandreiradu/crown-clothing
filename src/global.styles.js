import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    
    }
    body {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    
        padding: 20px 40px;

        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }
  
  a {
    text-decoration: none;
    color: #000;
  }

  

`;
