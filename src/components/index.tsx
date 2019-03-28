import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme";
import { App } from "./app";

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
