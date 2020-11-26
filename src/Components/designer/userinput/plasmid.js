import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import ShoppingBag from './plasmid.Components/shoppingbag';
import BagItemModal from './plasmid.Components/bagitemmodal';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    height: '100%',
    textAlign: 'left'
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
  const [clickedID, setClickedID] = useState('');
  const [clickedLabel, setClickedLabel] = useState('');
  const [clickedSeq, setClickedSeq] = useState('');
  const [clickedCollection, setClickedCollection] = useState('');

  const handleClickOpen = (itemid,itemlabel,itemseq,itemcollection) => {
    setClickedID(itemid)
    setClickedLabel(itemlabel)
    setClickedSeq(itemseq)
    setClickedCollection(itemcollection)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Typography className={classes.title}>
              Assembly Designer:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField 
            value={props.assemblyID}
            onChange={(e) => props.setAssemblyID(e.target.value)} id="outlined-basic" label="ID" variant='outlined'/>
          </Grid>
        </Grid>
        <Typography className={classes.pos}>
          Drag items above to build your plasmid
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
      itemcollection={clickedCollection}/>
    </Card>
  );
}