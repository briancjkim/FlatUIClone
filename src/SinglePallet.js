import React, { Component } from "react";
import ColorBox from "./ColorBox";

export class SinglePallet extends Component {
  constructor(props) {
    super(props);
    // super에는 props만주고 local variable에는 this.props로 준다
    this._colors = this.generateShades(this.props.pallet, this.props.colorId);
  }

  generateShades(pallet, colorIdToSearch) {
    let colors = [];
    const allColors = pallet.colors;
    for (let key in allColors) {
      colors = colors.concat(
        // find는 찾으면 더이상실행안하므로 filter는 끝까지실행
        allColors[key].filter(color => color.id === colorIdToSearch)
      );
    }
    // 맨첫번째 color[50]놈은 하얀색이라제외
    // slidce(begin,end) (end not included)
    return colors.slice(1);
  }
  render() {
    const colorBoxes = this._colors.map(color => (
      <ColorBox
        key={color.name}
        background={color.hex}
        name={color.name}
        showMore={false}
      />
    ));
    return (
      <div className="Pallet">
        <div className="Pallet-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SinglePallet;
