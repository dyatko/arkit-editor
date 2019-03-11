import * as React from "react";
import { render } from "react-dom";
import { Editor } from "./editor";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { Preview } from "./preview";
import { PersistGate } from "redux-persist/integration/react";
import { Header } from "./header";
import { reset } from 'styled-reset';
import { createGlobalStyle } from "styled-components";
import { Container } from "./container";
import { Section } from "./section";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  html,
  body,
  main {
    overflow: hidden;
    height: 100%;
  }
`

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />
      <Container>
        <Header />
        <Section>
          <Editor />
        </Section>
        <Section>
          <Preview />
        </Section>
      </Container>
    </PersistGate>
  </Provider>,
  document.querySelector("main")
);
