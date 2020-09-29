import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Faltas() {
  const [open, setOpen] = React.useState(false);
  const [estado, setEstado] = useState({})

   let ausente = useRef(null); let presente = useRef(null); 
   let si = useRef(null); let no = useRef(null)
   let yes = useRef(null); let nop = useRef(null)

   const handleChecked = (e, type) => {
      if(e.target.checked){
         setEstado({...estado, [e.target.name]: e.target.value})
            let asistencia = [ ausente, presente]
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
    <div style={{display: "inline-block"}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Faltó
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">¿La falta del alumno fue justificada?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <input type="checkbox" ref={presente} value="si" name="justify" 
            onChange={(e) => handleChecked(e, 'asist')}/>
            <label htmlFor="presente"> Si </label><br></br>
            <input type="checkbox"  ref={ausente} value="no" name="justify" 
            onChange={(e) => handleChecked(e, 'asist')}/>
            <label htmlFor="ausente"> No </label><br></br>
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
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
