import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  main: {
    backgroundColor: "red"
  }
};
function MiniPallet(props) {
  // props에 classes항목이 추가된다
  console.log(props.classes);
  const { classes } = props;
  return <div className={classes.main}>minipallet</div>;
}
export default withStyles(styles)(MiniPallet);
