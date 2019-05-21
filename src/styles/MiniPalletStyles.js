import transitions from "@material-ui/core/styles/transitions";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover $deleteIcon": {
      opacity: "1"
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
    marginLeft: "0.5rem"
  },
  miniColor: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative"
  },
  delete: {},
  deleteIcon: {
    color: "white",
    width: "20px",
    height: "20px",
    position: "absolute",
    backgroundColor: "#eb3d30",
    right: "0px",
    top: "0px",
    padding: "2px",
    zIndex: 10,
    opacity: 0
  }
};
export default styles;
