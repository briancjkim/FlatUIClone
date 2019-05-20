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

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    flexDirection: "row",
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
  navBtns: {}
});

export class PalletFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palletName: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isUniquePalletName", value => {
      //return boolean
      return this.props.pallets.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { classes, open, savePallet, handleDrawerOpen } = this.props;
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
              Create your own palette
            </Typography>
          </Toolbar>
          <div className="navBtns">
            <ValidatorForm onSubmit={() => savePallet(this.state.palletName)}>
              <TextValidator
                name="palletName"
                value={this.state.palletName}
                onChange={this.handleChange}
                validators={["required", "isUniquePalletName"]}
                errorMessages={[
                  "Enter Palette Name",
                  "PalletName is already taken"
                ]}
              />
              <Button type="submit" variant="contained" color="primary">
                Save palette
              </Button>
            </ValidatorForm>

            <Link to="/" className={classes.goBackLink}>
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PalletFormNav);
