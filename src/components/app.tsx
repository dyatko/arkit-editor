import * as React from "react";
import { State } from "../store/reducer";
import { Container } from "./container";
import { Section } from "./section";
import { Header } from "./header";
import { Logo } from "./logo";
import { Readme } from "./readme";
import { Editor } from "./editor";
import { Preview } from "./editor/preview";
import { connect } from "react-redux";

const mapStateToProps = (state: State): Partial<State> => ({
  mode: state.mode
});

export const App = connect(mapStateToProps)((props: Partial<State>) => {
  const isEditor = props.mode === "editor";

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
