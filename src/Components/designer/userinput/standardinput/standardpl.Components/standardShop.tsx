import React from "react";
import { BasicPart } from "../../../../../generated-sources";
import { Copyable } from "./standardCopyable";
interface Props {
  standardCollection: BasicPart[];
  onDeleteStandardPart: (partlabel: BasicPart["label"]) => void;
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
