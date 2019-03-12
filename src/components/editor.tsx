import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";
import { connect } from "react-redux";
import { updateEncoded, updatePUML } from "../store/actions";
import { State } from "../store/reducer";
import { registerPlantUML } from "../plantuml-language";

const mapStateToProps = (state: State): MonacoEditorProps => ({
  language: "plantuml",
  theme: "vs-dark",
  value: state.puml,
  options: {
    minimap: {
      enabled: false
    },
    automaticLayout: true
  }
});

let debounceEncoded: number;

const mapDispatchToProps = (dispatch): MonacoEditorProps => {
  return {
    editorWillMount(monaco) {
      registerPlantUML(monaco)
    },
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
)(MonacoEditor);
