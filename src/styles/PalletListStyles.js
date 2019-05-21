const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.5rem",
    color: "white",
    "& a": {
      textDecoration: "none",
      color: "white"
    }
  },
  pallets: {
    boxSizing: "border-box",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%"
  }
};
export default styles;
