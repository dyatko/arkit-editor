import logo from "../arkit.svg";
import styled from "styled-components";

export const Logo = styled.a.attrs(props => ({
  ...props,
  href: "https://www.npmjs.com/arkit",
  target: "_blank"
}))`
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
`;
