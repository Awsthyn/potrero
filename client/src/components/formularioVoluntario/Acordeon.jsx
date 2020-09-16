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

export default function Acordeon({dia, key}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [days, setDays] = useState({dia:[{de: 12, hasta: 14}]});
  const handleChange = (panel) => (event, isExpanded) => {
      console.log(event)
      setExpanded(isExpanded ? panel : false) 
  };


  const handleOnClick = (e) => {
      console.log("hi")
      return;
  }
  const handleTime = () => {
    console.log("hie")
    return;
  }
  const handleDelete = () => {
    console.log("ho")
    return;
  }

  return(
        <Accordion expanded={expanded === dia} onChange={handleChange(dia)}>
				<AccordionSummary
					//expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>{dia}</Typography>
					<Typography className={classes.secondaryHeading}>Escoge tu rango horario</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
					{expanded ? (
						<div>
							{days.dia && days.dia.map((h, i) => {
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
						</div>
					) : null}
					</Typography>
				</AccordionDetails>
			</Accordion>
  )
}