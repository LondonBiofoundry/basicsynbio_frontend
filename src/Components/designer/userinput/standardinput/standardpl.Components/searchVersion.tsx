import React, { useContext, useState } from "react";
import {
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
  selectedVersion: string;
  setSelectedVersion: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchVersion: React.FC<Props> = ({
  selectedCollection,
  setSelectedCollection,
  selectedVersion,
  setSelectedVersion,
}) => {
  const { names, collections } = useContext(Context);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedVersion(event.target.value as string);
  };

  const getVersions = (name: string) => {
    return getCollectionFromName(name, collections)?.availableVersions;
  };

  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <Select
        id="grouped-select"
        value={selectedVersion}
        onChange={handleChange}
      >
        {getVersions(selectedCollection)?.map((name, i) => (
          <MenuItem value={name}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
