import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function TerminosYCondiciones() {
   const [open, setOpen] = React.useState(false);
   const theme = useTheme();
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div style={{display: 'inline'}} > 
         <Button variant="outlined" color="primary" onClick={handleClickOpen}
            style={{border: 'none', outline: 'none'}}
         >
            Acepto los Términos y condiciones
         </Button>
         <Dialog
         fullScreen={fullScreen}
         open={open}
         onClose={handleClose}
         aria-labelledby="responsive-dialog-title"
         >
            <DialogTitle id="responsive-dialog-title">{"¿Acepta los términos y condiciones?"}</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates libero voluptatum labore, mollitia sapiente illo nostrum et? Dignissimos dolore, tempora odit repellat modi, ducimus, officia suscipit a deserunt harum necessitatibus.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reiciendis natus est magni illo ab doloribus, tempore repudiandae vel eaque, optio placeat, aut aspernatur officia. Dolores maiores praesentium animi porro?
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, non saepe? Veritatis quia consequatur nisi, ad deserunt dolorum rerum velit adipisci architecto voluptatem soluta asperiores hic possimus voluptatum sapiente reiciendis.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio exercitationem similique consectetur perferendis iste officiis porro omnis enim quasi dolore? Recusandae, aliquam maxime? Pariatur veniam illum repellat nisi iure eum.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, laborum. Ad, aspernatur doloremque dolores animi excepturi quia soluta quisquam, quis tenetur incidunt minus vero similique pariatur nesciunt laborum officia ipsam.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni distinctio blanditiis magnam laborum quasi quibusdam maiores ut. Nostrum cum officia iusto quos a sapiente obcaecati veritatis nesciunt! Nam, dolor placeat?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sapiente aspernatur repudiandae neque, laudantium eaque vero nisi itaque provident harum odit cupiditate praesentium natus doloremque quidem, vel suscipit asperiores. Omnis?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button autoFocus onClick={handleClose} color="primary" style={{outline: 'none'}}>
                  Aceptar
               </Button>
               {/* <Button onClick={handleClose} color="primary" autoFocus>
                  Cancelar
               </Button> */}
            </DialogActions>
         </Dialog>
      </div>
   );
}