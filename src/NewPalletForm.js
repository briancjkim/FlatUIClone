import React, { Component } from "react";
import classNames from "classnames";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
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
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

export class NewPalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      colorName: "",
      palletName: "",
      colors: [{ color: "blue", name: "asd" }]
    };
    this.ChangeCurrentColor = this.ChangeCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.savePallet = this.savePallet.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isUniquePalletName", value => {
      //return boolean
      return this.props.pallets.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isUniqueColorName", value => {
      //return boolean
      return this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isUniqueColor", value => {
      return this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      );
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  savePallet() {
    // 여기서 만든 컬러들과 이름 아이디를 APP부모컴포넌트로보낸다.
    const newName = this.state.palletName;
    const newPallet = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePallet(newPallet);
    this.props.history.push("/");
  }
  ChangeCurrentColor(color) {
    this.setState({
      currentColor: color.hex
    });
  }

  addNewColor() {
    const currnetColor = {
      name: this.state.colorName,
      color: this.state.currentColor
    };
    this.setState({
      colors: [...this.state.colors, currnetColor],
      colorName: ""
    });
  }
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Pick your colors
            </Typography>
            <ValidatorForm onSubmit={this.savePallet}>
              <TextValidator
                name="palletName"
                value={this.state.palletName}
                onChange={this.handleChange}
                validators={["isUniquePalletName"]}
                errorMessages={["PalletName is already taken"]}
              />
              <Button type="submit" variant="contained" color="primary">
                Save palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={color => this.ChangeCurrentColor(color)}
          />
          <ValidatorForm onSubmit={this.addNewColor} ref="form">
            <TextValidator
              name="colorName"
              value={this.state.colorName}
              onChange={this.handleChange}
              validators={["required", "isUniqueColorName", "isUniqueColor"]}
              errorMessages={[
                "Enter a Color name",
                "Color name is already used",
                "Color is already used"
              ]}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: this.state.currentColor }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {this.state.colors.map(color => (
            <DraggableColorBox color={color.color} name={color.name} />
          ))}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalletForm);
