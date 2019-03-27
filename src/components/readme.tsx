import * as React from "react";
import ReactMarkdown from "react-markdown";
import readmeMarkdown from "arkit/README.md";
import styled from "styled-components";
import { editor, languages } from "monaco-editor";

editor.setTheme("vs-dark");

const Scrollable = styled.div`
  flex: 1;
  overflow: scroll;
`;

const StyledMarkdown = styled.div`
  padding: 29px;
  padding-top: 0;
  box-sizing: border-box;
  max-width: 768px;
  width: 100%;
  margin: 0 auto;

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
    margin-top: 12px;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 8px;
  }

  pre {
    overflow: scroll;
  }

  code {
    font: 13px "Oxygen Mono", monospace;
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

  return (
    <pre>
      <code ref={ref} />
    </pre>
  );
};

export const Readme = () => (
  <Scrollable>
    <StyledMarkdown>
      <ReactMarkdown
        escapeHtml={false}
        renderers={{
          code: codeRenderer
        }}
      >
        {readmeMarkdown}
      </ReactMarkdown>
    </StyledMarkdown>
  </Scrollable>
);
