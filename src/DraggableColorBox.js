import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles/DraggableColorBoxStyles";
import chroma from "chroma-js";

const DraggableColorBox = SortableElement(props => {
  const { name, color, classes, handleClick } = props;
  const isDark = chroma(color).luminance() <= 0.08;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={`${classes.contentBox} ${isDark ? "dark" : "light"}`}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
