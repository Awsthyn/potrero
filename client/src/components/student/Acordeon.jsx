import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Horario from './Horario'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


export default function Acordeon({ dia, expandedAll, handleChange, render }) {
  const classes = useStyles();
  const [days, setDays] = useState('Agregar rango horario');
  function onDelete(){
    setDays('Agregar rango horario')
  }
  function onCreate(){
    setDays({startTime: null, endTime: null, weekDayName: dia})
  }

  return (
    <Accordion expanded={expandedAll === dia} onChange={handleChange(dia)} style={render[0] ?{border: '2px solid rgb(140, 198, 62'} : {backgroundColor: "white"}}>
      <AccordionSummary
        expandIcon={<span className="material-icons ">expand_more</span>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}  style={expandedAll === dia ? {fontWeight: '700'} : null}>{dia}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {expandedAll ? (
            <span>
              {typeof days == "string" ?  <div style={{width: "300px"}} className="ml-auto mr-auto"><Button style={{backgroundColor: '#492BC4', color: "white"}} onClick={onCreate}>Agregar horario</Button></div> : <Horario nameWeekDay={dia} onDelete={onDelete} /> }
            </span>
          ) : null}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
