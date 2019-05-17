import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

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
    const { name, background, moreUrl } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.handleCopy}>
        <div className="Colorbox" style={{ background }}>
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied</h1>
            <p>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
            {/*이걸클릭했는데 clippath 되는  event propagation현상을 막으려고*/}
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className="see-more">More</span>
            </Link>
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}
