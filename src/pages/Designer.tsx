import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import { UserInput } from "../components/designer/userinput/userinput";
import { Export } from "../components/designer/export/export";
import { BasicAssembly } from "../generated-sources";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
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
}));

function getSteps() {
  return [
    "Design your Constructs or Assemblies",
    "Export or View the Constructs Assemblies",
  ];
}

export default function Designer() {
  const classes = useStyles();

  const [currentBuild, setCurrentBuild] = useState<BasicAssembly[]>([]);

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

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <UserInput
            currentBuild={currentBuild}
            setCurrentBuild={setCurrentBuild}
          />
        );
      case 1:
        return <Export currentBuild={currentBuild} />;
      default:
        return (
          <Typography className={classes.instructions}>
            Unknown Step Index
          </Typography>
        );
    }
  }

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
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div style={{ padding: 20 }}>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
                spacing={3}
              >
                <Grid item>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={currentBuild.length ? false : true}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
