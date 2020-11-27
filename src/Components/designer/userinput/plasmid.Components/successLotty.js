import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        textAlign: 'left',
    },

    responsiveImage: {
        textAlign: 'center',

        [theme.breakpoints.up("xs")]:{
            height:"80px",
            width: "80px",
        }
    }
}));

export default function SuccessImg(props){

    const classes = useStyles();


    return(
        <div className={classes.responsiveImage}>
            <img src={process.env.PUBLIC_URL + 'success.png'}  alt="robot" className={classes.responsiveImage} />
        </div>
    )
}