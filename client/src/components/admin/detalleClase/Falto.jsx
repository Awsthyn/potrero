import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Falto({handleChange}) {
	const [open, setOpen] = React.useState(false);
	const [estado, setEstado] = useState({})
	let injustificada = useRef(null); let justificada = useRef(null); 

	const handleChecked = (e) => {
      if(e.target.checked){
			setEstado({...estado, [e.target.name]: e.target.value})
			handleChange(e.target.value)
            let asistencia = [ injustificada, justificada]
            asistencia.map(a => {
            	if(a.current.value !== e.target.value){
                  return a.current.checked = false
					}
					return
            }) 
      }else{
      	setEstado({...estado, [e.target.name]: null})
      }
	}

  const handleClickOpen = () => {
    setOpen(true);
  };

	const handleClose = () => {
		setOpen(false);
	};
	console.log(estado)
	return (
   <div style={{display: "inline-block"}} >
      <Button style={{backgroundColor: 'red', border:' 0px', color:' white', borderRadius: '10px', width: '100px', height:' 40px', textTransform: 'capitalize', fontSize: '1.1rem', fontFamily: 'Poppins', outline: 'none'}} variant="outlined" color="primary" onClick={handleClickOpen}>
      	Faltó
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">¿La falta del alumno fue justificada?</DialogTitle>
			<DialogContent>
				<DialogContentText>
            <input type="checkbox" ref={justificada} value="justificada" name="assistance" 
            onChange={(e) => handleChecked(e)}/>
            <label htmlFor="justificada"> Si </label><br></br>
            <input type="checkbox"  ref={injustificada} value="no justificada" name="assistance" 
            onChange={(e) => handleChecked(e)}/>
            <label htmlFor="no justificada"> No </label><br></br>
				</DialogContentText>
				{
					estado.justify === "si" ? 
				
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Justificacion"
					type="email"
					fullWidth
					name="justification"
					onChange={(e) => setEstado({...estado, [e.target.name]:e.target.value})}
				/>
				: null
				}
			</DialogContent>
			<DialogActions>
				<Button style={{outline: 'none'}} onClick={handleClose} color="primary">
					Cancelar
				</Button>
				<Button style={{outline: 'none'}} onClick={handleClose} color="primary">
					Aceptar
				</Button>
			</DialogActions>
			</Dialog>
		</div>
	);
}
