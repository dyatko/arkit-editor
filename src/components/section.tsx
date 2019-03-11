import styled from "styled-components";

export const Section = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;

  &:first-of-type {
    flex: 0.45;
    max-width: 480px;
    background: black;

    @media screen and (max-width: 768px) {
      max-width: 100%;
      min-height: 240px;
    }
  }

  &:last-of-type {
    position: relative;
  }
`