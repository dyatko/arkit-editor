import * as React from "react";
import ReactMarkdown from "react-markdown";
import readmeMarkdown from "arkit/README.md";
import styled from "styled-components";
import { editor, languages } from "monaco-editor";

editor.setTheme("vs-dark");

const StyledMarkdown = styled.div`
  padding: 24px;
  padding-top: 0;
  box-sizing: border-box;
  max-width: 768px;
  width: 100%;

  h1 {
    font-weight: bold;
    font-size: 32px;
    line-height: 130%;
    margin-top: 24px;
    margin-bottom: 12px;
  }

  h2 {
    font-weight: bold;
    font-size: 24px;
    line-height: 130%;
    margin-top: 28px;
    margin-bottom: 8px;
  }

  h4 {
    font-weight: bold;
    font-size: 13px;
    line-height: 130%;
    margin-top: 20px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  p {
    margin-bottom: 12px;
    line-height: 150%;
  }

  li {
    line-height: 150%;
    margin-bottom: 4px;

    &:before {
      content: "– ";
    }
  }

  code {
    font: 13px "Oxygen Mono", monospace;
    line-height: 150%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 4px;
    display: inline-block;
    white-space: nowrap;

    &.block {
      padding: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: block;
      overflow: scroll;
      margin-bottom: 12px;
    }
  }

  img {
    max-width: 100%;
  }

  p:not([align="center"]) img {
    padding: 6px;
    display: block;
    background: ${p => p.theme.lightBg};
    border-radius: 6px;
    box-sizing: border-box;
  }
`;

const codeRenderer = ({ language, value }) => {
  if (language === "console") {
    language = "sh";
  }

  const ref = React.createRef<HTMLElement>();
  const monacoLang = languages
    .getLanguages()
    .find(lang => [lang.id, ...lang.aliases].includes(language));
  const htmlPromise = monacoLang
    ? editor.colorize(value, monacoLang.id, {})
    : Promise.resolve(value);

  htmlPromise.then(result => {
    ref.current.innerHTML = result;
  });

  return <code className={"block"} ref={ref} />;
};

const staticBase = "https://raw.githubusercontent.com/dyatko/arkit/master/";
const normalizeURI = uri => new URL(uri, staticBase).toString();
const readmeMarkdownWithoutLogo = readmeMarkdown
  .split("\n")
  .map(line =>
    line.replace(/src="(.+?)"/, (substr, uri) => `src="${normalizeURI(uri)}"`)
  );
readmeMarkdownWithoutLogo.splice(1, 1);

export const Readme = () => (
  <StyledMarkdown>
    <ReactMarkdown
      escapeHtml={false}
      renderers={{
        code: codeRenderer
      }}
      transformImageUri={normalizeURI}
    >
      {readmeMarkdownWithoutLogo.join("\n")}
    </ReactMarkdown>
  </StyledMarkdown>
);
