import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Horarios from './Horarios';

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


export default function Acordeon({ dia, expandedAll, handleChange, setTime }) {
  const classes = useStyles();
  const [days, setDays] = useState('Agregar rango horario');

  const handleOnClick = (e) => {
    e.preventDefault();
    if (typeof days === 'string') {
      return setDays([{ startTime: 12, endTime: 13, nameWeekDay: dia }]);
    } else if (days.length < 2 && days[0].endTime < 19.5) {
      return setDays([...days, { startTime: days[0].endTime, endTime: days[0].endTime + 1, nameWeekDay: dia }]);
    }
  }
  const handleTime = (type, clase) => {
        if (type === 'aumentar' && clase === 'startTime' && days[0].startTime >= 8 && days[0].startTime < 19) {
          if (days[0].endTime - 1.5 < days[0].startTime) days[0].endTime = days[0].startTime + 1.5;
          setDays({ startTime: days[0].startTime + 0.5, endTime: days[0].endTime, nameWeekDay: dia });
        } else if (type === 'aumentar' && clase === 'endTime' && days[0].endTime < 20 && days[0].endTime >= 9) {
          setDays({ endTime: days[0][clase] + 0.5, startTime: days[0].startTime, nameWeekDay: dia });
        } else if (type === 'disminuir' && clase === 'startTime' && days[0].startTime <= 19 && days[0].startTime > 8) {
          setDays({ startTime: days[0][clase] - 0.5, endTime: days[0].endTime, nameWeekDay: dia });
        } else if (
          type === 'disminuir' &&
          clase === 'endTime' &&
          days[0].endTime <= 20 &&
          days[0].endTime > 9 &&
          days[0].endTime >= days[0].startTime + 1.5
        ) {
          setDays({ endTime: days[0][clase] - 0.5, startTime: days[0].startTime, nameWeekDay: dia });
        }
  }

  const handleDelete = (idx) => {
    if (days.length === 1) {
      return setDays('Agregar rango horario')
    }
    setDays(days.filter((h, i) => i !== idx));

  }
  useEffect(() => {
    if (typeof days !== 'string') setTime(days)
  }, [days])

  return (
    <Accordion expanded={expandedAll === dia} onChange={handleChange(dia)} >
      <AccordionSummary
        expandIcon={<span className="material-icons ">expand_more</span>}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{dia}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {expandedAll ? (
            <span>
              {typeof days === 'string' ? (<span> {days} </span>)
                : days.map((h, i) => {
                  return (
                    <Horarios
                      de={h.startTime}
                      hasta={h.endTime}
                      key={i}
                      id={i}
                      handleTime={handleTime}
                      handleDelete={() => handleDelete(i)}
                    />
                  );
                })}
              <button style={{ borderStyle: "none", backgroundColor: "#492BC4", fontWeight: "100", fontSize: "1.3em", paddingLeft: "10px", paddingRight: "10px" }}
                className="ml-2 text-white rounded-circle" onClick={e => handleOnClick(e)}> + </button>
            </span>
          ) : null}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}