import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Chip from './standardpl.Components/chip';
import StandardPartLinkerSearch from './standardpl.Components/standardpartsearch';
import Shop from './standardpl.Components/shop';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    height: '100%',
    textAlign: 'left'
  },
  title: {
    fontSize: 24,
  },
  pos: {
    margin: 12,
  },
});



export default function StandardPartLinker(props) {
  //const [COLLECTION] = React.useState(props.items);
  //console.log('standardpl',props.items)
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>
            Standard Part Linker from Collection
        </Typography>
        <Chip />
        <Typography className={classes.pos}>
          The below search options are actively changed to the objects inside the collections selected above, you must select atleast 1 object before continuing to search
        </Typography>
        <Typography className={classes.title} color="textSecondary" style={{paddingTop:'10px'}}>
            Search for Part
        </Typography>
        <StandardPartLinkerSearch value={props.value} onChangeValue={props.onChangeValue} options={props.options}/>
        <h2>Parts</h2>
        <Shop items={props.items} />
      </CardContent>
    </Card>
  );
}