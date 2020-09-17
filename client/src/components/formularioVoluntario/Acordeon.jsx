import React, {useState} from 'react';
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

export default function Acordeon({dia, expandedAll, handleChange}) {
  const classes = useStyles();
  const [days, setDays] = useState('Agregar rango horario');

  const handleOnClick = (e) => {
      if(typeof days === 'string'){
        return setDays({[dia]:[{de: 12, hasta: 14}]});
      }else if(days[dia].length < 2){
        return setDays({[dia]: [...days[dia], {de: 12, hasta: 14}]});
      }
  }
  const handleTime = (type, idx, clase) => {
    let newDays = days[dia].map((h,i) => {
      if(i === idx){
        if (type === 'aumentar' && clase === 'de' && h.de >= 8 && h.de < 17) {
          if (h.hasta - 1.5 < h.de) h.hasta = h.de + 1.5;
          return (h.de = {de: h.de + 0.5, hasta: h.hasta});
      }else if (type === 'aumentar' && clase === 'hasta' && h.hasta < 18 && h.hasta >= 9) {
                return (h[clase] = {hasta: h[clase] + 0.5, de: h.de});
              } else if (type === 'disminuir' && clase === 'de' && h.de <= 17 && h.de > 8) {
                return (h[clase] ={de: h[clase] - 0.5, hasta: h.hasta});
              } else if (
                type === 'disminuir' &&
                clase === 'hasta' &&
                h.hasta <= 18 &&
                h.hasta > 9 &&
                h.hasta >= h.de + 1.5
              ) {
                return (h[clase] = {hasta: h[clase] - 0.5, de: h.de});
              }
            }
          return h;
    })
  return  setDays({[dia]: newDays})
	
}
  
  const handleDelete = (idx) =>  {
    if(days[dia].length === 1){
      return setDays('Agregar rango horario')
    }
		setDays({[dia]: days[dia].filter((h, i) => i !== idx)});
		
	}

  return(
        <Accordion expanded={expandedAll === dia} onChange={handleChange(dia)}>
				<AccordionSummary
					expandIcon={<span className="material-icons">expand_more</span>}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>{dia}</Typography>
					<Typography className={classes.secondaryHeading}>Escoge tu rango horario</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
					{expandedAll ? (
						<span>
              {typeof days === 'string' ? (<span> {days} </span>)
              : days[dia].map((h, i) => {
								return (
									<Horarios
										de={h.de}
										hasta={h.hasta}
										key={i}
										id={i}
										handleTime={handleTime}
										handleDelete={handleDelete}
									/>
								);
							})}
							<button onClick={e => handleOnClick(e)}> + </button>
						</span>
					) : null}
					</Typography>
				</AccordionDetails>
			</Accordion>
  )
}