import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        color: 'black';
        font-family: "Roboto";
        font-size: 14px;
    }
`;

export const Button = styled.button`
   ${({ disabled }) =>
      disabled &&
      `
            disabled
        `}
   with: 30px;
   border-radius: 8px;
   &:hover {
      background-color: ${({ disabled }) => (disabled ? null : "lightgray")};
   }
   &:active {
      background-color: "lightgray";
      color: "black";
   }
   font-size: 0.7em;
`;
