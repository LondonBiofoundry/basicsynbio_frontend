import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Fasta from './custompl.Components/fasta';
import SBOL from './custompl.Components/SBOL';
import Genbank from './custompl.Components/genbank';
import Shop from './custompl.Components/shop';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height:'100%',
    textAlign: 'left'
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CustomPartLinker(props) {
  const classes = useStyles();
  
  const [method, setMethod] = React.useState('Genbank');

  const handleMethod = (event, newMethod) => {
    setMethod(newMethod);
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
            aria-label="text alignment">
              <ToggleButton value='Genbank'>Genbank</ToggleButton>
              <ToggleButton value='Fasta'>Fasta</ToggleButton>
              <ToggleButton value='SBOL'>SBOL</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Typography className={classes.pos} color="textSecondary">
          Upload your {method} file
        </Typography>
        {method==='Genbank'?<Genbank setUploadedFile={props.setUploadedFile}/>:<div />}
        {method==='Fasta'?<Fasta setUploadedFile={props.setUploadedFile}/>:<div />}
        {method==='SBOL'?<SBOL setUploadedFile={props.setUploadedFile}/>:<div />}
        <div style={{ paddingTop: 8 }}>
        </div>
        <Typography className={classes.title} style={{padding:'5px'}}>
          Custom Part Linker
        </Typography>
        <Shop items={props.items} onDeleteCustomPart={props.onDeleteCustomPart}/>
      </CardContent>
    </Card>
  );
}