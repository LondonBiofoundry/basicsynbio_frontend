import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import animationData from './fail/9915-spinner-fail.json';

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

export default function FailAnimation() {

    const classes = useStyles();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className={classes.responsiveImage}>
        <Lottie 
          options={defaultOptions}
          //height={432}
         // width={786}
        />
      </div>
    );
  }