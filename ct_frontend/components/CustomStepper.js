import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Drag and Drop any contensts",
    description: `All cintests are provided with start and end time.`,
  },
  {
    label: "Select Reminders",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Done",
    description: `And You're done!`,
  },
];

export default function CustomStepper({ setShowDragAndDrop }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    setShowDragAndDrop(true);
  };

  return (
    <Box
      sx={{
        height: "100%",
        background: "#0A1929",
        width: "100%",
        paddingTop: "32px",
        paddingLeft: "32px",
        paddingRight: "32px",
      }}
    >
      <Typography color="white" margin="auto" width="fit-content">
        Heading
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption" color="white">
                    Last step
                  </Typography>
                ) : null
              }
            >
              <Typography color="white">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography color="white">{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, background: "#0A1929" }}>
          <Typography color="white">All steps completed</Typography>
          <Button onClick={handleDone} sx={{ mt: 1, mr: 1 }}>
            Let's Begin
          </Button>
        </Paper>
      )}
    </Box>
  );
}
