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
// not supported by sortable-hoc anymore
import arrayMove from "array-move";
import PalletFormNav from "./PalletFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPalletFormStyles";
import seedColors from "./seedColors";

export class NewPalletForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: seedColors[0].colors
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
    // flat() 함수는 nested array를 다풀어준다 depth로 변수를넣어주면 nested 의 nsted까지 풀어준다
    // 바탕화면에 pallets이 다지워졌을때 이 함수를 실행하면 color가 undefined 인놈이 나와서 에러가된다

    // random from Pallets that currently on localstorage
    /*
        const isEmpty = this.props.pallets.length <= 0;
    const allColors = isEmpty
      ? seedColors.map(p => p.colors).flat()
      : this.props.pallets.map(p => p.colors).flat();
      */

    /* random from seedColors*/
    const allColors = seedColors.map(p => p.colors).flat();

    let randNewColor;
    let isDuplicate = true;
    while (isDuplicate) {
      let ranIndex = Math.floor(Math.random() * allColors.length);
      randNewColor = allColors[ranIndex];
      // 중복색깔이아니라면 while문을통과 아니면 반복
      isDuplicate = this.state.colors.some(
        color => color.name === randNewColor.name
      );
    }
    this.setState({
      colors: [...this.state.colors, randNewColor]
    });
  }

  deleteColor(name) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name)
    });
  }

  savePallet(newPallet) {
    // 여기서 만든 컬러들과 이름 아이디를 APP부모컴포넌트로보낸다.
    // pallet 에서는 palletMetaForm에서 보낸 palletName,emoji가들어잇다.
    newPallet.id = newPallet.paletteName.toLowerCase().replace(/ /g, "-");
    newPallet.colors = this.state.colors;

    this.props.savePallet(newPallet);
    this.props.history.push("/");
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor]
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
          <div className={classes.container}>
            <Typography variant="h4">Design your Palette</Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={palletIsFull}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              palletIsFull={palletIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
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
              distance={20}
            />
          }
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalletForm);
