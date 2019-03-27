import * as React from "react";
import { render } from "react-dom";
import { Editor } from "./editor";
import { Provider, connect } from "react-redux";
import { persistor, store } from "../store";
import { Preview } from "./preview";
import { PersistGate } from "redux-persist/integration/react";
import { Header } from "./header";
import { ThemeProvider } from "styled-components";
import { Container } from "./container";
import { Section } from "./section";
import { Logo } from "./logo";
import { Readme } from "./readme";
import { GlobalStyle, theme } from "./theme";
import { State } from "../store/reducer";

const mapStateToProps = (state: State): Partial<State> => ({
  mode: state.mode
});

const App = connect(mapStateToProps)((props: Partial<State>) => {
  const isEditor = props.mode === "editor";

  console.log(isEditor, props);

  return (
    <Container>
      <Section dark narrow={isEditor}>
        <Header>
          <Logo />
        </Header>
        <Readme />
        {isEditor && <Editor />}
      </Section>
      {isEditor && (
        <Section center>
          <Preview />
        </Section>
      )}
    </Container>
  );
});

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.querySelector("main")
);
