import * as React from "react";
import logo from "../arkit.svg";

const HeaderComponent = () => (
  <header>
    <a href="https://www.npmjs.com/arkit" target="_blank">
      <img src={logo} alt="arkit" />
    </a>
  </header>
);

export const Header = HeaderComponent;
