import React, { useContext, useState } from "react";
import {
  Checkbox,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  Input,
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Collection } from "../../../../../generated-sources";
import { Context } from "../../../../../App";
import { getCollectionFromName } from "../../../../../utils/getCollectionFromName";

interface Props {
  selectedCollection: Collection["name"];
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<Collection["name"]>
  >;
  setSelectedVersion: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchCollection: React.FC<Props> = ({
  selectedCollection,
  setSelectedCollection,
  setSelectedVersion,
}) => {
  const { names, collections } = useContext(Context);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCollection(event.target.value as string);
    setSelectedVersion(
      getCollectionFromName(event.target.value as string, collections)
        .availableVersions[0]
    );
  };

  const getBasicPartNames = (names: string[]) => {
    const basicParts = names.filter(
      (name: string) => name !== "BASIC_BIOLEGIO_LINKERS"
    );
    return basicParts;
  };

  const getBasicLinkerNames = (names: string[]) => {
    return names.filter((name: string) => name === "BASIC_BIOLEGIO_LINKERS");
  };

  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <Select
        id="grouped-select"
        value={selectedCollection}
        onChange={handleChange}
      >
        <ListSubheader>Basic Parts</ListSubheader>
        {getBasicPartNames(names).map((name, i) => (
          <MenuItem value={name}>{name}</MenuItem>
        ))}
        <ListSubheader>Basic Linkers</ListSubheader>
        {getBasicLinkerNames(names).map((name, i) => (
          <MenuItem value={name}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
