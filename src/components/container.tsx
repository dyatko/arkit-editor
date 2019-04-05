import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Centred = styled.div<{
  full?: boolean;
  direction?: "column" | "row";
}>`
  display: flex;
  flex-direction: ${p => p.direction || "column"};
  align-items: center;
  justify-content: center;
  flex: ${p => (p.full ? "1" : "initial")};
`;

export const Scrollable = styled.div`
  flex: 1;
  overflow: scroll;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
