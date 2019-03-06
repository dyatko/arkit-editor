import * as React from "react";
import { connect } from "react-redux";
import { State } from "../store/reducer";
import { stopLoading } from "../store/actions";
import Loader from "react-loader-spinner";

interface ImageProps {
  loading: boolean;
  src: string;
  onLoad: () => void;
}

class Image extends React.Component<ImageProps> {
  private imgRef = React.createRef<HTMLImageElement>();

  constructor(props) {
    super(props);
  }

  private checkImgLoad() {
    if (this.imgRef.current.complete) {
      this.props.onLoad();
    }
  }

  componentDidMount() {
    this.checkImgLoad();
  }

  componentDidUpdate() {
    this.checkImgLoad();
  }

  render() {
    return (
      <React.Fragment>
        <img
          ref={this.imgRef}
          onLoad={this.checkImgLoad.bind(this)}
          onError={event => window.alert(event)}
          src={this.props.src}
          style={{ visibility: this.props.loading ? "hidden" : "visible" }}
          alt="Diagram preview"
        />
        {this.props.loading && (
          <div className="loader">
            <Loader type="MutatingDot" />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): Partial<ImageProps> => {
  const host =
    process.env.NODE_ENV === "development" ? "https://arkit.herokuapp.com" : "";
  return {
    src: `${host}${state.url}?raw`,
    loading: !state.loaded
  };
};

const mapDispatchToProps = (dispatch): Partial<ImageProps> => {
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
