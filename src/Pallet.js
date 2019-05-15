import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Pallet.css";

export class Pallet extends Component {
  render() {
    const colorBoxes = this.props.colors.map(c => (
      <ColorBox key={c.name} background={c.color} name={c.name} />
    ));
    return (
      <div className="Pallet">
        {/* header */}
        <div className="Pallet-colors"> {colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}

export default Pallet;
