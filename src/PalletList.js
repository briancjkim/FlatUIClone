import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPallet from "./MiniPallet";

export class PalletList extends Component {
  render() {
    const { pallets } = this.props;
    const list = pallets.map(pallet => (
      <p key={pallet.id}>
        <Link to={`/pallet/${pallet.id}`}>{pallet.paletteName}</Link>
      </p>
    ));
    return (
      <div>
        <MiniPallet />
        {list}
      </div>
    );
  }
}

export default PalletList;
