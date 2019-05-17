import React from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    height: "100px",
    width: "100%",
    borderRadius: "5px",
    backgroundColor: "#dae1e4",
    overflow: "hidden",
    // solve a gap caused by inline-blocks
    fontSize: 0
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    fontSize: "1.5rem",
    marginLeft: "0,5rem"
  },
  miniColor: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative"
  }
};
function MiniPallet(props) {
  // props에 classes항목이 추가된다
  const { classes, paletteName, id, emoji, colors } = props;
  const miniColorBoxes = colors.map(c => (
    <div
      key={c.name}
      className={classes.miniColor}
      style={{ backgroundColor: c.color }}
    />
  ));
  return (
    <Link to={`/pallet/${id}`}>
      <div className={classes.root}>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    </Link>
  );
}
export default withStyles(styles)(MiniPallet);
