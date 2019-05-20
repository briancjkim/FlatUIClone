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

const drawerWidth = 400;
const styles = theme => ({
  root: {
    display: "flex"
  },

  hide: {
    display: "none"
  },
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns: {
    marginRight: "1rem"
  },
  navBtn: {
    margin: "0 0.5rem"
  },
  goBackLink: {
    textDecoration: "none"
  }
});

export class PalletFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingForm: false
    };
    this.showForm = this.showForm.bind(this);
  }
  showForm() {
    this.setState({
      showingForm: true
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
          <PalletMetaForm savePallet={savePallet} pallets={pallets} />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PalletFormNav);
