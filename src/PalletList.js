import React, { Component } from "react";
import MiniPallet from "./MiniPallet";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PalletListStyles";
// delete animation routeing animiation 하게해주는library
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

export class PalletList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      palletId: ""
    };
  }

  goToPallet(id) {
    // Link로 페이지이동 안하는이유 default link text style이 글자에 다밑줄쳐서
    this.props.history.push(`/pallet/${id}`);
  }

  openDialog = palletId => {
    // 휴지통버튼누르면 minipallet 에서 실행된다. 밑에 컴퍼너트에서 id가져온다.
    this.setState({
      openDeleteDialog: true,
      palletId: palletId
    });
  };
  handleDelete = () => {
    // dialog안에서 삭제 버튼확인후 작동하는 함수
    this.props.deletePallet(this.state.palletId);
    this.closeDialog();
  };
  closeDialog = () => {
    this.setState({
      openDeleteDialog: false
    });
  };

  render() {
    const { pallets, classes, deletePallet } = this.props;
    const { openDeleteDialog } = this.state;
    const list = pallets.map(pallet => (
      // className 이아니라 classNames인것을 주의
      //   deletePallet={deletePallet}
      <CSSTransition key={pallet.id} classNames="fade" timeout={500}>
        <MiniPallet
          key={pallet.id}
          {...pallet}
          openDialog={this.openDialog}
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
        <Dialog
          open={openDeleteDialog}
          onClose={this.closeDialog}
          aria-labelledby="simple-dialog-title"
        >
          <DialogTitle id="simple-dialog-title">
            Delete this pallet?
          </DialogTitle>
          <div>
            <List>
              <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: blue[100], color: blue[600] }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Delete" />
              </ListItem>
              <ListItem button onClick={this.closeDialog}>
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: red[100], color: red[600] }}
                  >
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItem>
            </List>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PalletList);
