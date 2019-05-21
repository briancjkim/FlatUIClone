import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

import React from "react";

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: "100%", fontSize: 0 }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          key={index}
          index={index}
          color={color.color}
          name={color.name}
          handleClick={() => deleteColor(color.name)}
        />
      ))}
    </div>
  );
});
export default DraggableColorList;
