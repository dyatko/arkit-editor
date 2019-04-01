import styled, { css } from "styled-components";

interface SectionProps {
  dark?: boolean;
  center?: boolean;
  narrow?: boolean;
  collapsed?: boolean;
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

const collapsedCSS = css`
  flex: 0;
`;

export const Section = styled.section<SectionProps>`
  flex: 1;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: ${p => (p.dark ? p.theme.light : p.theme.dark)};
  background: ${p => (p.dark ? p.theme.darkBg : p.theme.lightBg)};
  transition: all 0.4s ease-out;
  ${p => p.center && centerCSS}
  ${p => p.narrow && narrowCSS}
  ${p => p.collapsed && collapsedCSS}
`;
