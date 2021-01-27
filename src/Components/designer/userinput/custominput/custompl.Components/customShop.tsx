import React from "react";
import { Part } from "../../../../../interfaces/Part";
import { Copyable } from "../../standardinput/standardpl.Components/standardCopyable";
interface Props {
  items: Part[];
  onDeleteCustomPart: (partlabel: Part["label"]) => void;
}

export const CustomShop: React.FC<Props> = ({ items, onDeleteCustomPart }) => {
  return (
    <Copyable
      droppableId="SHOP2"
      standardCollection={items}
      onDeleteStandardPart={onDeleteCustomPart}
    />
  );
};
