import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Divider from "@material-ui/core/Divider";

import { Genbank } from "./custompl.Components/genbank";
import { CustomShop } from "./custompl.Components/customShop";
import { MultipleCheck } from "./custompl.Components/MultipleCheck";
import { AddISeq } from "./custompl.Components/addiseq";
import { BasicPart } from "../../../../generated-sources";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "100%",
    textAlign: "left",
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  items: BasicPart[];
  setUploadedFile: React.Dispatch<React.SetStateAction<BasicPart | undefined>>;
  onDeleteCustomPart: (partlabel: BasicPart["label"]) => void;
}

export const CustomPartLinker: React.FC<Props> = ({
  items,
  setUploadedFile,
  onDeleteCustomPart,
}) => {
  const classes = useStyles();

  const [method, setMethod] = React.useState<string>("Genbank");
  const [catchError, setCatchError] = React.useState("");
  const [multiplePartLinkers, setMultiplePartLinkers] = React.useState(false);
  const [addiseq, setAddiseq] = React.useState(false);

  const handleMethod = (event: any, newMethod: string) => {
    if (["Genbank"].indexOf(newMethod) >= 0) {
      setMethod(newMethod);
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography className={classes.title}>
              Custom Part Linker
            </Typography>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              color="secondary"
              value={method}
              exclusive
              onChange={handleMethod}
              aria-label="text alignment"
            >
              <ToggleButton value="Genbank">Genbank</ToggleButton>
              {/* <ToggleButton value="Fasta">Fasta</ToggleButton> */}
              {/* <ToggleButton value="SBOL">SBOL</ToggleButton> */}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Typography className={classes.pos} color="textSecondary">
          Upload your {method} file
        </Typography>
        <MultipleCheck
          multiplePartLinkers={multiplePartLinkers}
          setMultiplePartLinkers={setMultiplePartLinkers}
        />
        <AddISeq addiseq={addiseq} setAddiseq={setAddiseq} />
        {method === "Genbank" ? (
          <Genbank
            addiseq={addiseq}
            multiplePartLinkers={multiplePartLinkers}
            setUploadedFile={setUploadedFile}
            setCatchError={setCatchError}
          />
        ) : (
          <div />
        )}
        {/* {method === "Fasta" ? (
          <Fasta
            addiseq={addiseq}
            multiplePartLinkers={multiplePartLinkers}
            setUploadedFile={setUploadedFile}
            setCatchError={setCatchError}
          />
        ) : (
          <div />
        )} */}
        {/* {method === "SBOL" ? (
          <SBOL
            addiseq={addiseq}
            setUploadedFile={setUploadedFile}
            setCatchError={setCatchError}
          />
        ) : (
          <div />
        )} */}
        <div style={{ paddingTop: 8 }}></div>
        {catchError ? "Unable to Process : " + catchError : ""}
        <Typography
          className={classes.title}
          style={{ padding: "5px" }}
          color="textSecondary"
        >
          Draggable Part Linker from file
        </Typography>
        <Divider variant="middle" />
        <CustomShop items={items} onDeleteCustomPart={onDeleteCustomPart} />
      </CardContent>
    </Card>
  );
};
