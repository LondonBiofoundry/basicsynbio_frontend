import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { SeqViz } from "seqviz";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  SeqVizDiv: {
    width:'1000px',
    height:'200px'
  }
});

export default function BagItemModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        width='1000px'
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.itemid}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.itemlabel}
          </DialogContentText>
          <div className={classes.SeqVizDiv}>
            <SeqViz
              name="J23100"
              seq="TTGACGGCTAGCTCAGTCCTAGGTACAGTGCTAGC"
              viewer='linear'
              annotations={[{ name: "promoter", start: 0, end: 34, direction: 1 }]}
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}