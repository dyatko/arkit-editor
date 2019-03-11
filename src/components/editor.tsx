import AceEditor, { AceEditorProps } from "react-ace";
import "brace/theme/monokai";
import "brace/mode/plain_text";
import { connect } from "react-redux";
import { updateEncoded, updatePUML } from "../store/actions";
import { State } from "../store/reducer";

const mapStateToProps = (state: State): AceEditorProps => ({
  mode: "plain_text",
  theme: "monokai",
  value: state.puml,
  width: "100%",
  height: "100%",
  setOptions: {
    tabSize: 2
  }
});

let debounceEncoded: number;

const mapDispatchToProps = (dispatch): AceEditorProps => {
  return {
    onChange(puml) {
      dispatch(updatePUML(puml));

      if (debounceEncoded) clearTimeout(debounceEncoded);

      debounceEncoded = setTimeout(() => {
        dispatch(updateEncoded(puml));
      }, 1000);
    }
  };
};

export const Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(AceEditor);
