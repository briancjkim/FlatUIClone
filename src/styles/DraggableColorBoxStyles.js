import sizes from "./sizes";

// passing props doesnt work
const styles = {
  "@global": {
    ".dark": {
      color: "white !important"
    }
  },
  root: {
    width: "20%",
    height: "25%",
    positoin: "relative",
    display: "inline-block",
    margin: "0 auto",
    cursor: "pointer",
    position: "relative",
    "&:hover $deleteIcon": {
      transform: "scale(1.5)",
      color: "white"
    },
    fontSize: "1.2rem",
    // marginTop: "-4px"instead fontsize:0 to parentComponent
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%"
    }
  },
  contentBox: {
    position: "absolute",
    bottom: "0",
    left: "0",
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    color: "rgba(0,0,0,0.8)",
    textTransform: "uppercase",
    padding: "10px"
  },
  deleteIcon: {
    transition: "all .3s ease-in-out"
  }
};

export default styles;
