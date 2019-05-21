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
    fontSize: "1.2rem"
    // marginTop: "-4px"instead fontsize:0 to parentComponent
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

    textTransform: "uppercase",
    padding: "10px"
  },
  deleteIcon: {
    transition: "all .3s ease-in-out"
  }
};

export default styles;
