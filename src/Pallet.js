import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

import "./Pallet.css";

export class Pallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex"
    };
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleChangeFormat = this.handleChangeFormat.bind(this);
  }
  handleChangeLevel(level) {
    this.setState({ level });
  }
  handleChangeFormat(value) {
    this.setState({
      format: value
    });
  }
  render() {
    const { colors, paletteName, emoji, id: palletId } = this.props.pallet;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(c => (
      <ColorBox
        key={c.id}
        background={c[format]}
        name={c.name}
        moreUrl={`/pallet/${palletId}/${c.id}`}
        showMore={true}
      />
    ));
    return (
      <div className="Pallet">
        <Navbar
          level={level}
          handleChangeFormat={this.handleChangeFormat}
          handleChangeLevel={this.handleChangeLevel}
        />
        <div className="Pallet-colors"> {colorBoxes}</div>
        <footer className="Pallet-footer">{paletteName}</footer>
      </div>
    );
  }
}

export default Pallet;
