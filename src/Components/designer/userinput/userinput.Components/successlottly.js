import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import animationData from './success/9917-success.json';

const useStyles = makeStyles((theme) => ({
    root:{
        height: '100%',
    },
    responsiveImage: {
      textAlign: 'center',
      [theme.breakpoints.up("xs")]:{
        height:"80px",
        width:"80px",
        padding:'20px'
      }
  }
}));

export default function SuccessAnimation(props) {

    const classes = useStyles();

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    function CreateAnimation() {
      return(
        <Lottie 
        options={defaultOptions}
        />
      )
    }
    
    return (
      <div className={classes.responsiveImage}>
        <CreateAnimation />
      </div>
    );
  }