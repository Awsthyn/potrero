import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import estadisticas from './assets/estadisticas.png';

const VIOLETA = '#492BC4';
const VERDE = '#8CC63E';
const NEGRO = '#333333';

const useStyles = makeStyles({
  root: {
    width: `calc(100% - ${220}px)`,
    marginLeft: 220,
  },
  font: {
    position: 'absolute',
    fontFamily: 'Poppins',
    fontWeight: 700,
    margin: 60,
  },
  img: {
    width: '1700px',
    objectFit: 'cover',
    color: '#333333',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div style={{width:'100%'}} className={classes.root}>
      <h1 className={classes.font}>Asistencia de alumnos</h1>
      <img className={classes.img} src={estadisticas} alt='' />
    </div>
  );
};
