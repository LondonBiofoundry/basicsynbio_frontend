import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { ShoppingBag } from "./plasmid.Components/shoppingbag";
import { BagItemModal } from "./plasmid.Components/bagitemmodal";

import SuccessImg from "./plasmid.Components/successLotty";
import { Part } from "../../../../interfaces/Part";

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

interface Props {
  COLLECTION: Part[];
  COLLECTION2: Part[];
  assemblyName: string;
  assemblyDesc: string;
  setAssemblyDesc: React.Dispatch<React.SetStateAction<string>>;
  setAssemblyName: React.Dispatch<React.SetStateAction<string>>;
  validated: boolean;
  assemblyID: string;
  setAssemblyID: React.Dispatch<React.SetStateAction<string>>;
  items: Part[];
  onShopItemDelete: (itemid: Part["id"]) => void;
}

export const Plasmid: React.FC<Props> = ({
  COLLECTION,
  COLLECTION2,
  assemblyName,
  assemblyDesc,
  setAssemblyDesc,
  setAssemblyName,
  validated,
  assemblyID,
  setAssemblyID,
  items,
  onShopItemDelete,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [clickedItem, setclickedItem] = useState<Part>();

  const handleClickOpen = (item: Part) => {
    setclickedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              value={assemblyName}
              onChange={(e) => setAssemblyName(e.target.value)}
              id="outlined-basic2"
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              value={assemblyDesc}
              onChange={(e) => setAssemblyDesc(e.target.value)}
              style={{ width: "100%" }}
              id="outlined-basic3"
              label="Description"
              variant="outlined"
            />
          </Grid>
          {validated ? <DisplaySuccess /> : null}
        </Grid>
        <Typography className={classes.pos}>
          Drag items above to build your Assembly
        </Typography>
        <div className="hello">
          <h1>Parts List</h1>
          <ShoppingBag
            COLLECTION={COLLECTION}
            COLLECTION2={COLLECTION2}
            items={items}
            onShopItemDelete={onShopItemDelete}
            openDialog={handleClickOpen}
          />
        </div>
      </CardContent>
      {clickedItem !== undefined ? (
        <BagItemModal
          open={open}
          handleClose={handleClose}
          item={clickedItem}
        />
      ) : (
        <></>
      )}
    </Card>
  );
};
