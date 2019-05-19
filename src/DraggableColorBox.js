import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    positoin: "relative",
    display: "inline-block",
    margin: "0 auto",
    curosr: "pointer",
    position: "relative",
    "&:hover $deleteIcon": {
      transform: "scale(1.5)",
      color: "white"
    },
    marginTop: "-3.5px"
  },
  contentBox: {
    position: "absolute",
    bottom: "0",
    left: "0",
    color: "rgba(0,0,0,.5)",
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    fontSize: "12px",
    textTransform: "uppercase",
    padding: "10px"
  },
  deleteIcon: {
    transition: "all .3s ease-in-out"
  }
};
const DraggableColorBox = SortableElement(props => {
  const { name, color, classes, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.contentBox}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
