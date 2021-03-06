import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Horarios from './Horarios';
import style from './VoluntarioForm.module.css';

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


export default function Acordeon({dia, expandedAll, handleChange, setTime, render}) {
  const classes = useStyles();
  const [days, setDays] = useState('Agregar rango horario');

  const handleOnClick = (e) => {
      if(typeof days === 'string'){
        return setDays([{startTime: 12, endTime: 14, nameWeekDay: dia}]);
      }else if(days.length < 2 && days[0].endTime < 19.5){
        return setDays([...days, {startTime: days[0].endTime, endTime: days[0].endTime + 1, nameWeekDay: dia}]);
      }
  }
  const handleTime = (type, idx, clase) => {
    let newDays = days.map((h,i) => {
      if(i === idx){
        if (days.length === 1 && type === 'aumentar' && clase === 'startTime' && h.startTime >= 8 && h.startTime < 19) {
          if (h.endTime - 1.5 < h.startTime) h.endTime = h.startTime + 1.5;
          return (h.startTime = {startTime: h.startTime + 0.5, endTime: h.endTime, nameWeekDay: dia});
        }
        if (days.length === 2 && idx === 0 && type === 'aumentar' && clase === 'startTime' && h.startTime >= 8 && h.startTime < days[1].startTime -1) {
          if (h.endTime - 1.5 < h.startTime) h.endTime = h.startTime + 1.5;
          return (h.startTime = {startTime: h.startTime + 0.5, endTime: h.endTime, nameWeekDay: dia});
        }
        if (days.length === 2 && idx === 1 && type === 'aumentar' && clase === 'startTime' && h.startTime >= 8 && h.startTime < 19) {
          if (h.endTime - 1.5 < h.startTime) h.endTime = h.startTime + 1.5;
          return (h.startTime = {startTime: h.startTime + 0.5, endTime: h.endTime, nameWeekDay: dia});
        }   
        else if (days.length === 1 && type === 'aumentar' && clase === 'endTime' && h.endTime < 20 && h.endTime >= 9) {
          return (h[clase] = {endTime: h[clase] + 0.5, startTime: h.startTime, nameWeekDay: dia});
        }
        else if (days.length === 2 && idx === 0 && type === 'aumentar' && clase === 'endTime' && h.endTime < days[1].startTime && h.endTime >= 9) {
          return (h[clase] = {endTime: h[clase] + 0.5, startTime: h.startTime, nameWeekDay: dia});
        }
        else if (days.length === 2 && idx === 1 && type === 'aumentar' && clase === 'endTime' && h.endTime < 20 && h.endTime >= 9) {
          return (h[clase] = {endTime: h[clase] + 0.5, startTime: h.startTime, nameWeekDay: dia});
        }
        else if (type === 'disminuir' && clase === 'startTime' && h.startTime <= 19 && h.startTime > 8) {
          return (h[clase] ={startTime: h[clase] - 0.5, endTime: h.endTime, nameWeekDay: dia});
        } 
        else if (type === 'disminuir' && clase === 'endTime' && h.endTime <= 20 && h.endTime > 9 && h.endTime >= h.startTime + 1.5) {
          return (h[clase] = {endTime: h[clase] - 0.5, startTime: h.startTime, nameWeekDay: dia});
        }
      }
          return h;
    })
    if(newDays[1] && newDays[1].startTime < days[0].endTime){
      newDays[1] = {startTime: days[0].endTime, endTime: days[1].endTime, nameWeekDay: dia}
    }
  return  setDays(newDays)
}
  
  const handleDelete = (idx) =>  {
    if(days.length === 1){
      return setDays('Agregar rango horario')
    }
		setDays(days.filter((h, i) => i !== idx));
		
  }
  useEffect(() => {
    if(typeof days !== 'string') setTime(days, false)
    else{
      setTime([{nameWeekDay: dia}], true)
    }
  }, [days])

  useEffect(() => {
    if(typeof days === 'string' && render[0]){
      setDays(render)
    }
  }, [render])
  

  return(
        <Accordion expanded={expandedAll === dia} onChange={handleChange(dia)} style={render[0] ?{border: '2px solid rgb(140, 198, 62'} : {backgroundColor: "white"}}>
				<AccordionSummary
					expandIcon={<span className="material-icons ">expand_more</span>}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading} style={expandedAll === dia ? {fontWeight: '700'} : null} >{dia}</Typography>
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
                    dia={dia}
										handleTime={handleTime}
										handleDelete={handleDelete}
									/>
								);
							})}
							{(typeof days === 'string' || days.length < 2) ? <button className={style.accordionButton} onClick={e => handleOnClick(e)}> + </button> : null}
						</span>
					) : null}
					</Typography>
				</AccordionDetails>
			</Accordion>
  )
}