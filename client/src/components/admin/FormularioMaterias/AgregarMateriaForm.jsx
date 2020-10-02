import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';





const useStyles = makeStyles((theme) => ({
 
}));



export default function AgregarMateriaForm(props) {
  const classes = useStyles();
  const [materia, setMateria] = useState('');

  const handleChange = (event) => {
    setMateria(event.target.value);
  };


  return (
        <form>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant='outlined'
                        label='Nombre de Materia'
                        value={materia}
                    />
                     <TextField
                        variant='outlined'
                        label='Nombre de Materia'
                        value={materia}
                    />

                </Grid>
            </Grid>
     </form>
  )
}