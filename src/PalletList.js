import React, { Component } from "react";
import MiniPallet from "./MiniPallet";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PalletListStyles";

export class PalletList extends Component {
  goToPallet(id) {
    // Link로 페이지이동 안하는이유 default link text style이 글자에 다밑줄쳐서
    this.props.history.push(`/pallet/${id}`);
  }
  render() {
    const { pallets, classes } = this.props;
    const list = pallets.map(pallet => (
      <MiniPallet
        key={pallet.id}
        {...pallet}
        handleClick={() => this.goToPallet(pallet.id)}
      />
    ));
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Chanjong Color</h1>
            <Link to="/pallet/new">Create Palette</Link>
          </nav>
          <div className={classes.pallets}>{list}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PalletList);
