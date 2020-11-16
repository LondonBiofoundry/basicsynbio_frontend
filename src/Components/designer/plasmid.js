import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import ShoppingBag from './plasmid.Components/shoppingbag';

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
  console.log('bag',props.items)
  const classes = useStyles();

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
              Plasmid Designer:
            </Typography>
          </Grid>
          <Grid item xs={3}>
          <form>
            <TextField id="outlined-basic" label="ID" variant='outlined'/>
          </form>
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
            />
        </div>
      </CardContent>
    </Card>
  );
}