import * as React from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider
} from "styled-components";
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
    overflow-scrolling: auto;
    -webkit-overflow-scrolling: auto;
    height: 100%;
    width: 100%;
    position: fixed;
    font: 300 14px "Oxygen", Helvetica, sans-serif;
  }

  a {
    color: inherit;
  }
`;

export const Theme = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </React.Fragment>
);
