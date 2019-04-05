import * as React from "react";
import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateEncoded, updatePUML } from "../../store/actions";
import { emptyPUML, State } from "../../store/reducer";
import { registerPlantUML } from "./plantuml-language";

const mapStateToProps = (state: State): MonacoEditorProps => ({
  language: "plantuml",
  theme: "vs-dark",
  value: state.puml,
  options: {
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  }
});

let debounceEncoded: number;

const mapDispatchToProps = (dispatch): MonacoEditorProps => {
  return {
    editorWillMount(monaco) {
      registerPlantUML(monaco);
    },
    onChange(puml) {
      if (!puml.trim()) {
        puml = emptyPUML;
      }

      dispatch(updatePUML(puml));

      if (debounceEncoded) clearTimeout(debounceEncoded);

      debounceEncoded = setTimeout(() => {
        dispatch(updateEncoded(puml));
      }, 1000);
    }
  };
};

const Holder = styled.div`
  overflow: hidden;
`;

export const Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ ...props }) => (
  <Holder>
    <MonacoEditor {...props} />
  </Holder>
));
