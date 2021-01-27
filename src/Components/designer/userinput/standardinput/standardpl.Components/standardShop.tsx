import React from "react";
import { Part } from "../../../../../interfaces/Part";
import { Copyable } from "./standardCopyable";
interface Props {
  standardCollection: Part[];
  onDeleteStandardPart: (partlabel: Part["label"]) => void;
}

export const StandardShop: React.FC<Props> = ({
  standardCollection,
  onDeleteStandardPart,
}) => {
  return (
    <Copyable
      droppableId="SHOP"
      standardCollection={standardCollection}
      onDeleteStandardPart={onDeleteStandardPart}
    />
  );
};
