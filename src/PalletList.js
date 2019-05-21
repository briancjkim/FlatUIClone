import React, { Component } from "react";
import MiniPallet from "./MiniPallet";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PalletListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export class PalletList extends Component {
  goToPallet(id) {
    // Link로 페이지이동 안하는이유 default link text style이 글자에 다밑줄쳐서
    this.props.history.push(`/pallet/${id}`);
  }
  render() {
    const { pallets, classes, deletePallet } = this.props;
    const list = pallets.map(pallet => (
      // className 이아니라 classNames인것을 주의
      <CSSTransition key={pallet.id} classNames="fade" timeout={500}>
        <MiniPallet
          key={pallet.id}
          {...pallet}
          deletePallet={deletePallet}
          handleClick={() => this.goToPallet(pallet.id)}
        />
      </CSSTransition>
    ));
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Chanjong Color</h1>
            <Link to="/pallet/new">Create Palette</Link>
          </nav>
          <TransitionGroup className={classes.pallets}>{list}</TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PalletList);
