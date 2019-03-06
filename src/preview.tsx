import * as React from "react";
import { connect } from "react-redux";
import { State } from "./reducer";
import { stopLoading } from "./actions";
import Loader from "react-loader-spinner";

const Image = ({ src, loading, onLoad }) => {
  return (
    <React.Fragment>
      <img
        src={src}
        onLoad={onLoad}
        onError={event1 => window.alert(event1)}
        style={{ visibility: loading ? "hidden" : "visible" }}
      />
      {loading && (
        <div className="loader">
          <Loader type="MutatingDot" />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => {
  const host = process.env.NODE_ENV === 'development' ? 'https://arkit.herokuapp.com' : ''
  return {
    src: `${host}${state.url}?raw`,
    loading: !state.loaded
  };
};

const mapDispatchToProps = (
  dispatch
): React.ImgHTMLAttributes<HTMLImageElement> => {
  return {
    onLoad() {
      dispatch(stopLoading());
    }
  };
};

export const Preview = connect(
  mapStateToProps,
  mapDispatchToProps
)(Image);
