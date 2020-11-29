import React from "react";
import Copyable from "../standardpl.Components/copyable";

export default function Shop(props) {
  return (
    <Copyable
      droppableId="SHOP2"
      className="shop"
      items={props.items}
      onDeleteStandardPart={props.onDeleteCustomPart}
    />
  );
}
