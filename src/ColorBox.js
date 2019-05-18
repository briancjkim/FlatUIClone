import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./ColorBox.css";

export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
    this.handleCopy = this.handleCopy.bind(this);
  }
  handleCopy() {
    this.setState(
      {
        copied: true
      },
      () =>
        setTimeout(() => {
          this.setState({ copied: false });
        }, 1500)
    );
  }
  render() {
    const { name, background, moreUrl, showMore } = this.props;
    const { copied } = this.state;
    const isLightColor = chroma(background).luminance() >= 0.7;
    const isDarkColor = chroma(background).luminance() <= 0.08;

    return (
      <CopyToClipboard text={background} onCopy={this.handleCopy}>
        <div className="Colorbox" style={{ background }}>
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1 className={isLightColor && "dark-text"}>Copied</h1>
            <p className={isLightColor && "dark-text"}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor && "light-text"}>{name}</span>
            </div>
            <button className={`copy-button  ${isLightColor && "dark-text"} `}>
              Copy
            </button>
            {/* showMore 은 SingPallet에서 more버튼없고 그냥 Pallet에서는 있게하려고 */}
            {/*이걸클릭했는데 clippath 되는  event propagation현상을 막으려고*/}
            {showMore && (
              <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                <span className={`see-more ${isLightColor && "dark-text"}`}>
                  More
                </span>
              </Link>
            )}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}
