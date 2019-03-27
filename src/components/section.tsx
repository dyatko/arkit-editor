import styled, { css } from "styled-components";

interface SectionProps {
  dark?: boolean;
  center?: boolean;
  narrow?: boolean;
}

const centerCSS = css`
  align-items: center;
  justify-content: center;
  position: relative;
`;

const narrowCSS = css`
  flex: 0.45;
  max-width: 480px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    min-height: 300px;
  }
`;

export const Section = styled.section<SectionProps>`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${p => (p.dark ? p.theme.light : p.theme.dark)};
  background: ${p => (p.dark ? p.theme.darkBg : p.theme.lightBg)};
  ${p => p.center && centerCSS}
  ${p => p.narrow && narrowCSS}
`;
