import React from "react";

export default function PalletFooter(props) {
  const { paletteName, emoji } = props;
  return (
    <footer className="Pallet-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
}
