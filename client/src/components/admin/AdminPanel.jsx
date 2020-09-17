import React from 'react'
import {Link} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles({
    root:{
        width:`calc(100% - ${220}px)`,
        marginLeft: 220,
    },
    font:{
        fontFamily: 'Poppins',
    },
})

export default () => {
    const classes = useStyles()
             return    (
                 <div className={classes.root}>
                    
                </div>
                )
        }