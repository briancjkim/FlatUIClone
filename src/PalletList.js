import React, { Component } from "react";
import { Link } from "react-router-dom";

export class PalletList extends Component {
  render() {
    const { pallets } = this.props;
    const list = pallets.map(pallet => (
      <p>
        {" "}
        <Link to={`/pallet/${pallet.id}`}>{pallet.paletteName}</Link>
      </p>
    ));
    return <div>{list}</div>;
  }
}

export default PalletList;
