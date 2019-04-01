import * as React from "react";
import { connect } from "react-redux";
import { State } from "../../store/reducer";
import { stopLoading } from "../../store/actions";
import { Spinner } from "./spinner";
import { ResponsiveImage } from "./responsive-image";

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
    } else {
      console.log("Loading is not complete");
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
        <ResponsiveImage
          ref={this.imgRef}
          onLoad={this.checkImgLoad.bind(this)}
          onError={event => {
            console.error(event);
            this.checkImgLoad();
          }}
          src={this.props.src}
          style={{ visibility: this.props.loading ? "hidden" : "visible" }}
          alt="Diagram preview"
        />
        {this.props.loading && <Spinner />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): Partial<ImageProps> => {
  let isDev = process.env.NODE_ENV === "development";
  const host = isDev ? "https://arkit.pro" : "";

  return {
    src: `${host}${state.url}/raw`,
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
