import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Grid } from "@material-ui/core";

import HomeImage from "../Components/home/homeimg"
import HomeText from "../Components/home/hometext"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor:'#3D5A80',
      minHeight:'850px',
      paddingTop:'50px'
    }
}));

export default function Home(){

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            padding={1}
            >
                <Grid item xs={1} />
                <Grid item xs={11} sm={4}>
                    <HomeText />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <HomeImage />
                </Grid>
            </Grid>
        </div>
    )
}