import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPalletStyles";
import DeleteIcon from "@material-ui/icons/Delete";

function MiniPallet(props) {
  // props에 classes항목이 추가된다
  const { classes, paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map(c => (
    <div
      key={c.name}
      className={classes.miniColor}
      style={{ backgroundColor: c.color }}
    />
  ));
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.delete}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
        />
      </div>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
export default withStyles(styles)(MiniPallet);
