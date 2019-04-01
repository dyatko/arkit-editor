import * as React from "react";
import { Mode, State } from "../store/reducer";
import { Centred, Container, Scrollable } from "./container";
import { Section } from "./section";
import { Logo } from "./logo";
import { Readme } from "./readme";
import { Editor } from "./editor";
import { Preview } from "./editor/preview";
import { connect } from "react-redux";
import { Switcher } from "./switcher";
import { Stars } from "./stars";

const mapStateToProps = (state: State): Partial<State> => ({
  mode: state.mode
});

export const App = connect(mapStateToProps)((props: Partial<State>) => {
  const isEditor = props.mode === Mode.EDITOR;

  return (
    <Container>
      <Section dark narrow={isEditor}>
        <Centred as="header">
          <Logo />
        </Centred>
        {!isEditor && (
          <Scrollable>
            <Readme />
          </Scrollable>
        )}
        {isEditor && <Editor />}
        <Centred as="footer" direction="row">
          <Switcher target={Mode.ABOUT}>About arkit</Switcher>
          <Switcher target={Mode.EDITOR}>PlantUML editor</Switcher>
          <Stars />
        </Centred>
      </Section>
      <Section center collapsed={!isEditor}>
        <Preview />
      </Section>
    </Container>
  );
});
