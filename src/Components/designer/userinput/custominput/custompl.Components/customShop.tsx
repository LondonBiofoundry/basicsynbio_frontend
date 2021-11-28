import React from "react";
import { BasicPart } from "../../../../../generated-sources";
import { Copyable } from "../../standardinput/standardpl.Components/standardCopyable";
interface Props {
  items: BasicPart[];
  onDeleteCustomPart: (partlabel: BasicPart["label"]) => void;
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
