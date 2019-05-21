import sizes from "./sizes";
import bg from "./bg.svg";

const styles = {
  // palletList-.item-exit-active 이런식말고 classname을 library에서 쓴 그대로를 refer하고싶을때
  //.item-axit-active로 표현해야할때
  // @global기능을쓰면 사용할수있다.
  "@global": {
    ".fade-enter": {
      opacity: 0
    },
    ".fade-enter-active": {
      opacity: 1,
      transition: "opacity 500ms ease-out"
    },
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out"
    }
  },
  root: {
    /* background by SVGBackgrounds.com */
    backgroundColor: "#0daf30",
    backgroundImage: `url(${bg})`,
    overflow: "auto",

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
    flexWrap: "wrap",
    // mediaquery를 사이즈변수에따라 다른값이나오도록 함수로만들었다.
    [sizes.down("xl")]: {
      width: "80%"
    },
    [sizes.down("xs")]: {
      width: "70%"
    }
  },
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.5rem",
    color: "white",
    "& a": {
      fontWeight: "800",
      letterSpacing: "1px",
      border: "1px solid white",
      padding: ".5rem 1rem",
      borderRadius: "5px",
      textDecoration: "none",
      marginTop: "7px",
      color: "white",
      transition: "all .3s"
    },
    "& a:hover": {
      color: "#0daf30",
      backgroundColor: "white"
    },
    [sizes.down("xs")]: {
      fontSize: "1.3rem"
    }
  },
  pallets: {
    boxSizing: "border-box",
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3,30%)",
    // safari에서는 graidGap %지원안한다
    gridGap: "2.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2,50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1rem"
    }
  }
};
export default styles;
