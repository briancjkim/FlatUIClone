import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPalletStyles";
import DeleteIcon from "@material-ui/icons/Delete";

// MiniPallet에서 delete를누를때마다 게속다시 rendering되는 문제
// PureComponent를 상속하는것으로 1차적으로 해결할수있고.
// 지금 계속다시 rendering되는이유는 props이 새롭게바뀌고있다는건데
// 이는 부모에서 arrow function을 props로 계속주고잇기때문이다.
// arrowfunction은 prop으로 주게될때 계속 새로운function으로 내부적으로 인식되기때문에 새로운prop이라생각하고
// 계속 rendering하늑너기때문에 arrowfunction을 바꿔야한다
// Component를상속했을시에는 shouldComponentUpdate(newstprops,nextState)를 구현해야하는데
// PureComponent를 상속하기만하면 내부적으로 비교를해서 update한다
class MiniPallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deletePallet = this.deletePallet.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  deletePallet(e) {
    e.stopPropagation();
    // openDialog 가 id를 가져간다
    this.props.openDialog(this.props.id);
  }
  handleClick() {
    // prop에서 전달되는 goToPallet(id)를
    //arrowfunction안쓰려고 이렇게한다.
    this.props.goToPallet(this.props.id);
  }
  render() {
    // props에 classes항목이 추가된다
    const { classes, paletteName, emoji, colors } = this.props;
    const miniColorBoxes = colors.map(c => (
      <div
        key={c.name}
        className={classes.miniColor}
        style={{ backgroundColor: c.color }}
      />
    ));
    return (
      <div className={classes.root} onClick={this.handleClick}>
        <div className={classes.delete}>
          <DeleteIcon
            className={classes.deleteIcon}
            style={{ transition: "all 0.3s ease-in-out" }}
            onClick={this.deletePallet}
          />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPallet);
