import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import ShoppingBag from "./plasmid.Components/shoppingbag";
import BagItemModal from "./plasmid.Components/bagitemmodal";

import SuccessImg from "./plasmid.Components/successLotty";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    height: "100%",
    textAlign: "left",
  },
  title: {
    fontSize: 30,
  },
  pos: {
    marginTop: 12,
  },
});

export default function StandardPartLinker(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [clickedID, setClickedID] = useState("");
  const [clickedLabel, setClickedLabel] = useState("");
  const [clickedSeq, setClickedSeq] = useState("");
  const [clickedCollection, setClickedCollection] = useState("");
  const [clickenBin, setclickenBin] = useState("");

  const handleClickOpen = (
    itemid,
    itemlabel,
    itemseq,
    itemcollection,
    itembin
  ) => {
    setClickedID(itemid);
    setClickedLabel(itemlabel);
    setClickedSeq(itemseq);
    setClickedCollection(itemcollection);
    setclickenBin(itembin);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function DescriptionContent() {
    return (
      <TextField
        value={props.assemblyDesc}
        onChange={(e) => props.setAssemblyDesc(e.target.value)}
        style={{ width: "100%" }}
        id="outlined-basic"
        label="Description"
        variant="outlined"
      />
    );
  }

  function Description() {
    if (props.validated) {
      return (
        <Grid item xs={5}>
          <DescriptionContent />
        </Grid>
      );
    } else {
      return (
        <Grid item xs={6}>
          <DescriptionContent />
        </Grid>
      );
    }
  }

  function DisplaySuccess() {
    return (
      <Grid item xs={1}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            <SuccessImg />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={3}>
            <Typography className={classes.title}>
              Assembly Designer:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              style={{ width: "100%" }}
              value={props.assemblyName}
              onChange={(e) => props.setAssemblyName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              value={props.assemblyDesc}
              onChange={(e) => props.setAssemblyDesc(e.target.value)}
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </Grid>
          {props.validated ? <DisplaySuccess /> : null}
        </Grid>
        <Typography className={classes.pos}>
          Drag items above to build your Assembly
        </Typography>
        <div className="hello">
          <h1>Parts List</h1>
          <ShoppingBag
            items={props.items}
            onShopItemDelete={props.onShopItemDelete}
            openDialog={handleClickOpen}
          />
        </div>
      </CardContent>
      <BagItemModal
        open={open}
        handleClose={handleClose}
        itemlabel={clickedLabel}
        itemid={clickedID}
        itemseq={clickedSeq}
        itemcollection={clickedCollection}
        itembin={clickenBin}
      />
    </Card>
  );
}
