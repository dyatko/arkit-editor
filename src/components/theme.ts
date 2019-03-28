import { createGlobalStyle, DefaultTheme } from "styled-components";
import { reset } from "styled-reset";

declare module "styled-components" {
  interface DefaultTheme {
    light: string;
    dark: string;
    lightBg: string;
    darkBg: string;
  }
}

export const theme: DefaultTheme = {
  light: "white",
  dark: "black",
  lightBg: "#efefef",
  darkBg: "#1e1e1e"
};

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  html,
  body,
  main {
    overflow: hidden;
    height: 100%;
    font: 300 14px "Oxygen", Helvetica, sans-serif;
  }
`;
