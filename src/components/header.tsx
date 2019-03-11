import * as React from "react";
import logo from "../arkit.svg";
import styled from 'styled-components';

const Logo = styled.a`
  background: url(${logo}) no-repeat bottom center;
  background-size: contain;
  opacity: 0.3;
  display: block;
  width: 33vw;
  height: 60px;
  max-width: 180px;
  transition: 200ms all ease-in-out;
  
  &:hover {
    opacity: 1;
  }
`

const HeaderComponent = styled.header`
  position: fixed;
  z-index: 100;
  bottom: 10px;
  right: 10px;
`

export const Header = () => (
  <HeaderComponent>
    <Logo href="https://www.npmjs.com/arkit" target="_blank" />
  </HeaderComponent>
)
