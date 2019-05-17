import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPallet from "./MiniPallet";

export class PalletList extends Component {
  render() {
    const { pallets } = this.props;
    const list = pallets.map(pallet => <MiniPallet {...pallet} />);
    return <div>{list}</div>;
  }
}

export default PalletList;
