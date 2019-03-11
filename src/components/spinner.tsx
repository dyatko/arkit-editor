import * as React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

export const Spinner = styled(Loader).attrs({ type: 'MutatingDot' })`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    height: auto;
  }
`