import * as React from "react";
import styled from "styled-components";
import GitHubButton from "react-github-btn";

const Holder = styled.span`
  margin: 8px 0 16px 8px;
`;

export const Stars = () => (
  <Holder>
    <GitHubButton
      href="https://github.com/dyatko/arkit"
      data-icon="octicon-star"
      data-show-count="true"
      aria-label="Star dyatko/arkit on GitHub"
    />
  </Holder>
);
