import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserInput from '../Components/designer/userinput';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import { green } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { brown } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  FAB: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  FABitem: {
    marginRight: theme.spacing(1),
  },
  FABitemgreen: {
    marginRight: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  FABitemorange: {
    marginRight: theme.spacing(1),
    color: theme.palette.common.white,
    backgroundColor: brown[900],
    '&:hover': {
      backgroundColor: orange[600],
    },
  }
}));

function getSteps() {
  return ['Design your Constructs or Assemblies', 'Export or View the Constructs Assemblies'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <UserInput />;
    case 1:
      return 'Export / View assembly';
    default:
      return 'Unknown stepIndex';
  }
}

export default function Designer() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div style={{ padding: 20 }}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <div className={classes.FAB}>
                    <Fab className={classes.FABitem} variant="extended" color="primary" aria-label="add">
                      <VisibilityRoundedIcon className={classes.extendedIcon}/>
                      Visualise
                    </Fab>
                    <Fab className={classes.FABitemgreen} variant="extended" aria-label="edit">
                      <DoneAllRoundedIcon className={classes.extendedIcon}/>
                      Validate
                    </Fab>
                    <Fab className={classes.FABitem} variant="extended" color="secondary">
                      <BuildRoundedIcon className={classes.extendedIcon} />
                      View Current Build
                    </Fab>
                    <Fab className={classes.FABitem} variant="extended" color="secondary" aria-label="like">
                      <AddIcon className={classes.extendedIcon}/>
                      Add to Build
                    </Fab>
                  </div>
                </Grid>
                <Grid item>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}