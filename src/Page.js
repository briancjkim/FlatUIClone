import React from "react";
import "./styles/Page.css";

export default function Page(props) {
  const { children } = props;
  return <section className={`page `}>{children}</section>;
}
