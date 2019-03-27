import styled from "styled-components";

export const Container = styled.div`
  font: 300 14px "Oxygen", Helvetica, sans-serif;
  line-height: 140%;
  display: flex;
  height: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
