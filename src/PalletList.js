import React, { Component } from "react";
import MiniPallet from "./MiniPallet";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.5rem"
  },
  pallets: {
    boxSizing: "border-box",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%"
  }
};

export class PalletList extends Component {
  goToPallet(id) {
    // Link로 페이지이동 안하는이유 default link text style이 글자에 다밑줄쳐서
    this.props.history.push(`/pallet/${id}`);
  }
  render() {
    const { pallets, classes } = this.props;
    const list = pallets.map(pallet => (
      <MiniPallet {...pallet} handleClick={() => this.goToPallet(pallet.id)} />
    ));
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Chanjong Color</h1>
          </nav>
          <div className={classes.pallets}>{list}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PalletList);
