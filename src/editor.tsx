import * as React from "react";
import AceEditor, { AceEditorProps } from "react-ace";
import "brace/theme/monokai";
import "brace/mode/plain_text";
import { connect } from "react-redux";
import { updatePUML } from "./actions";
import { State } from "./reducer";

const mapStateToProps = (state: State): AceEditorProps => ({
  mode: "plain_text",
  theme: "monokai",
  value: state.puml,
  debounceChangePeriod: 500,
  width: '100%',
  height: '100%',
  setOptions: {
    tabSize: 2
  }
});

const mapDispatchToProps = (dispatch): AceEditorProps => {
  return {
    onChange(value) {
      dispatch(updatePUML(value));
    }
  };
};

export const Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(AceEditor);
