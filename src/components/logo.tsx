import logo from "../arkit.svg";
import styled from "styled-components";

export const Logo = styled.a.attrs(props => ({
  ...props,
  href: "https://www.npmjs.com/arkit",
  target: "_blank"
}))`
  background: url(${logo}) no-repeat center;
  background-origin: content-box;
  background-size: contain;
  display: block;
  width: 33vw;
  height: 60px;
  max-width: 150px;
  filter: invert(1);
  padding: 6px;
  margin: 0 auto;
`;
