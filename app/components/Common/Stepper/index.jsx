import React , {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from 'components/Common/Button';
import Typography from '@material-ui/core/Typography';
import {ButtonWrap} from "./Wrapper";
import { Save } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonDiv:{
    display: 'flex',
    justifyContent:'flex-end'
  }
}));


export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    setActiveStep(props.activeStep);
  },[props.activeStep])

  const handleNext = () => {
    if(activeStep === props.display.length - 1) {
      props.onSubmit()
    }else{
      if(props.display[activeStep].onCheckBeforeNext && !props.display[activeStep].checkDataInfo) {
        props.display[activeStep].onCheckBeforeNext();
      } else{
        props.changeActiveStep((prevActiveStep) => prevActiveStep + 1)
      }

    }
  };

  useEffect(() => {
    if(props.checkDataInfo){
        props.changeActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  },[props.checkDataInfo ])

  const handleBack = () => {
    props.changeActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    props.changeActiveStep(0);
  };
  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {props.display.map((item,index) => (
          <Step key={item.label} >
            <StepLabel>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {props.display[activeStep] ? props.display[activeStep].screen : null}
      <div>
        {activeStep === props.display.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div className={classes.buttonDiv}>
              <ButtonWrap>
                <Button
                  variant='outlined'
                  color="primary"
                  content='Quay lại'
                  //startIcon={<UndoIcon />}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                />
              </ButtonWrap>
              <ButtonWrap>
                <Button
                  color="primary"
                  content={activeStep === props.display.length - 1 ? props.buttonName : 'Tiếp theo'}
                  startIcon={activeStep === props.display.length - 1 ? <Save /> : null}
                  disabled = {props.buttonDisable}
                  onClick={handleNext}
                />
              </ButtonWrap>
            </div>
        )}
      </div>
    </div>
  );
}
