import React from 'react'
import {Paper} from "@mui/material";
import useStyles from './styles';

export const Home = () => {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            <div>Home page</div>
        </Paper>
    )
}
