import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import PalletMetaForm from "./PalletMetaForm";
import styles from "./styles/PalletFormNavStyles";

export class PalletFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingForm: false
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }
  showForm() {
    this.setState({
      showingForm: true
    });
  }
  hideForm() {
    this.setState({
      showingForm: false
    });
  }

  render() {
    const { classes, open, savePallet, handleDrawerOpen, pallets } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Drag and Drop colors and save
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/" className={classes.goBackLink}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.navBtn}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showForm}
              className={classes.navBtn}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.showingForm && (
          <PalletMetaForm
            savePallet={savePallet}
            pallets={pallets}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PalletFormNav);
