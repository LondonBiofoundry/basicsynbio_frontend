import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { SearchCollection } from "./standardpl.Components/seachCollection";
import { SearchPart } from "./standardpl.Components/searchPart";
import { StandardShop } from "./standardpl.Components/standardShop";
import { Collection, BasicPart } from "../../../../generated-sources";
import { Context } from "../../../../App";
import { SearchVersion } from "./standardpl.Components/searchVersion";
import { getCollectionFromName } from "../../../../utils/getCollectionFromName";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    height: "100%",
    textAlign: "left",
  },
  title: {
    fontSize: 24,
  },
});

interface Props {
  standardCollection: BasicPart[];
  value: BasicPart | undefined;
  onDeleteStandardPart: (partlabel: BasicPart["label"]) => void;
  onChangeValue: React.Dispatch<React.SetStateAction<BasicPart | undefined>>;
}

export const StandardInput: React.FC<Props> = ({
  standardCollection,
  value,
  onDeleteStandardPart,
  onChangeValue,
}) => {
  const classes = useStyles();
  const { names, collections } = useContext(Context);

  const [selectedCollection, setSelectedCollection] = useState<
    Collection["name"]
  >(names[0]);
  const [selectedVersion, setSelectedVersion] = useState<string>("v0.1");
  const [partOptions, setPartOptions] = useState<BasicPart[]>([]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
          Standard Part Linker from Collection
        </Typography>
        <Typography color="textSecondary" style={{ paddingTop: "10px" }}>
          Select Collection
        </Typography>
        <SearchCollection
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          setSelectedVersion={setSelectedVersion}
        />
        <Typography color="textSecondary" style={{ paddingTop: "10px" }}>
          Select Version of the Collection
        </Typography>
        <SearchVersion
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />
        <Typography color="textSecondary" style={{ paddingTop: "10px" }}>
          Search for Part/Linker
        </Typography>
        <SearchPart
          value={value}
          selectedVersion={selectedVersion}
          onChangeValue={onChangeValue}
          clickedCollections={[selectedCollection]}
          partOptions={partOptions}
          setPartOptions={setPartOptions}
        />
        <Typography
          color="textSecondary"
          className={classes.title}
          style={{ padding: "5px" }}
        >
          Standard Part Linker from Collection
        </Typography>
        <Divider variant="middle" />
        <Typography>
          Hover over a part to read its description, drag the part to the parts
          list below to add it to the plasmid.
        </Typography>
        <StandardShop
          standardCollection={standardCollection}
          onDeleteStandardPart={onDeleteStandardPart}
        />
      </CardContent>
    </Card>
  );
};
