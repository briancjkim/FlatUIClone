import React from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    positoin: "relative",
    display: "inline-block",
    margin: "0 auto",
    curosr: "pointer"
  }
};
const DraggableColorBox = props => {
  const { name, color } = props;
  return (
    <div className={props.classes.root} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};
export default withStyles(styles)(DraggableColorBox);
