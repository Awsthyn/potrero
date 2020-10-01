import React, {useState, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Asistio({handleChange}) {
   const [open, setOpen] = React.useState(false);
   const [estado, setEstado] = useState({})
	let presente = useRef(null); let tardanza = useRef(null); 

	const handleChecked = (e) => {
      if(e.target.checked){
         setEstado({...estado, [e.target.name]: e.target.value})
         handleChange(e.target.value)
            let asistencia = [presente, tardanza]
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

   return (
      <div>
         <Button  style={{backgroundColor: '#8cc63e', border: '0px', color: 'white', 
            borderRadius: '10px', textTransform: 'capitalize',width: '100px', height: '40px', fontFamily: 'Poppins', fontSize: '1.1rem', marginRight: '20px', outline: 'none'}} variant="outlined" color="primary" 
            onClick={handleClickOpen}>
         Asistió
         </Button>
         <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
         >
         <DialogTitle id="form-dialog-title">¿El alumno asistió a horario?</DialogTitle>
			<DialogContent>
				<DialogContentText>
               <input type="checkbox" ref={presente} value="presente" name="assistance" 
               onChange={(e) => handleChecked(e)}/>
               <label htmlFor="presente"> Si </label><br></br>
               <input type="checkbox"  ref={tardanza} value="tardanza" name="assistance" 
               onChange={(e) => handleChecked(e)}/>
               <label htmlFor="tardanza"> No </label><br></br>
				</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button style={{outline: 'none'}} onClick={handleClose} color="primary">
               Cancelar
            </Button>
            <Button style={{outline: 'none'}} onClick={handleClose} color="primary" autoFocus>
               Aceptar
            </Button>
         </DialogActions>
         </Dialog>
      </div>
   );
}
