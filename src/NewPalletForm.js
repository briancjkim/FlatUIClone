import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PalletFormNav from "./PalletFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPalletFormStyles";

export class NewPalletForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.pallets[0].colors
    };
    this.addNewColor = this.addNewColor.bind(this);
    this.savePallet = this.savePallet.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  // method imported from React Sortable Hoc
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearColors() {
    this.setState({
      colors: []
    });
  }
  addRandomColor() {
    // nested array를 다풀어준다 depth로 변수를넣어주면 nested 의 nsted까지 풀어준다
    const allColors = this.props.pallets.map(p => p.colors).flat();
    let ranIndex = Math.floor(Math.random() * allColors.length);
    this.setState({
      colors: [...this.state.colors, allColors[ranIndex]]
    });
  }

  deleteColor(name) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name)
    });
  }

  savePallet(palletName) {
    // 여기서 만든 컬러들과 이름 아이디를 APP부모컴포넌트로보낸다.
    const newName = palletName;
    const newPallet = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePallet(newPallet);
    this.props.history.push("/");
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor],
      colorName: ""
    });
  }
  render() {
    const { classes, maxColors, pallets } = this.props;
    const { open, colors } = this.state;
    const palletIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PalletFormNav
          open={open}
          classes={classes}
          savePallet={this.savePallet}
          pallets={pallets}
          handleDrawerOpen={this.handleDrawerOpen}
        />
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
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColor}
              disabled={palletIsFull}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            palletIsFull={palletIsFull}
            addNewColor={this.addNewColor}
            colors={colors}
          />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {
            <DraggableColorList
              colors={colors}
              deleteColor={this.deleteColor}
              onSortEnd={this.onSortEnd}
              axis="xy"
            />
          }
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalletForm);
