import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { SearchCollection } from "./standardpl.Components/seachCollection";
import { SearchPart } from "./standardpl.Components/searchPart";
import { StandardShop } from "./standardpl.Components/standardShop";
import { Part } from "../../../../interfaces/Part";
import { Collection } from "../../../../interfaces/Collection";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    height: "100%",
    textAlign: "left",
  },
  title: {
    fontSize: 24,
  },
  pos: {
    margin: 12,
  },
});

interface Props {
  standardCollection: Part[];
  value: Part | undefined;
  onDeleteStandardPart: (partlabel: Part["label"]) => void;
  onChangeValue: React.Dispatch<React.SetStateAction<Part | undefined>>;
}

export const StandardInput: React.FC<Props> = ({
  standardCollection,
  value,
  onDeleteStandardPart,
  onChangeValue,
}) => {
  const classes = useStyles();

  const [CollectionOptions, setCollectionOptions] = useState<Collection[]>([]);
  const [clickedCollections, setClickedCollections] = useState<Collection[]>(
    []
  );
  const [partOptions, setPartOptions] = useState<Part[]>([]);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
          Standard Part Linker from Collection
        </Typography>
        <SearchCollection
          clickedCollections={clickedCollections}
          setClickedCollections={setClickedCollections}
          collections={CollectionOptions}
          setCollections={setCollectionOptions}
        />
        <Typography className={classes.pos}>
          The below search options are actively changed to the objects inside
          the collections selected above, you must select atleast 1 object
          before continuing to search
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          style={{ paddingTop: "10px" }}
        >
          Search for Part/Linker
        </Typography>
        <SearchPart
          value={value}
          onChangeValue={onChangeValue}
          clickedCollections={clickedCollections}
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
        <Typography className={classes.pos}>
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
