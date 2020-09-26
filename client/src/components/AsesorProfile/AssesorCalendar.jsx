import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import style from './AsesorProfile.module.css';

export default function AssesorCalendar() {
   const [open, setOpen] = React.useState(false);
   let horas = ['08:00', null,null, null,null, null, '09:00', null,null, null,null, null,'10:00', null,null, null,null, null, '11:00', null,null, null,null, null, '12:00', null,null, null,null, null, '13:00', null,null, null,null, null, '14:00', null,null, null,null, null, '15:00', null,null, null,null, null, '16:00', null,null, null,null, null,'17:00', null,null, null,null, null, '18:00', null,null, null,null, null, '19:00',null,null, null,null, null, '20:00',null,null, null,null, null]
   
   const handleClickOpen = () => {
      setOpen(true);
   };
   
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div style={{display: 'inline'}} >
         <i className={`far fa-calendar-alt ${style.actions}`} onClick={handleClickOpen}></i>
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogActions>
            <Button onClick={handleClose} color="primary" >
            X
            </Button>
         </DialogActions>
         <div className={style.calendarContainer}>
            <div className={style.column} > Hora </div>
            <div className={style.column}>Lunes</div>
            <div className={style.column}>Martes</div>
            <div className={style.column}>Miércoles</div>
            <div className={style.column}>Jueves</div>
            <div className={style.column}>Viernes</div>
            {horas.map(h => <div style={{border: '1px solid black'}}> {h} </div>)}
         </div>
         {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
            </DialogContentText>
         </DialogContent> */}
      </Dialog>
      </div>
   );
}


