import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// position last due to rc-slide default classname
import "./Pallet.css";

export class Pallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(level) {
    this.setState({ level });
  }
  render() {
    const { colors } = this.props.pallet;
    const { level } = this.state;
    const colorBoxes = colors[level].map(c => (
      <ColorBox key={c.name} background={c.hex} name={c.name} />
    ));
    return (
      <div className="Pallet">
        <div className="slider">
          <Slider
            defaultValue={level}
            onChange={this.handleChange}
            min={100}
            max={900}
            step={100}
          />
        </div>

        <div className="Pallet-colors"> {colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}

export default Pallet;
