import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getSubjects,deleteSubject,postSubject,putSubject} from "../../../redux/actions/subject"
import { getAcademicLevels} from "../../../redux/actions/academicLevel"

import axios from 'axios';

import { connect } from "react-redux";

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import Button  from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:'center',
    '& > *': {
        marginTop:theme.spacing(15),
        marginBottom:theme.spacing(10),
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(80),
    },
  },
  paper:{
    width:'80%',
  }
}));



function AgregarMateria(props) {
  const classes = useStyles();
  const [materias, setMaterias] = useState([]);
  const [existentes, setExistentes] = useState([]);
  const [materia, setMateria] = useState('');
  const [error,setSubmit] = useState(false);
  const [niveles,setNiveles] =useState({});
  const [nivelesEducativos,setNivelesEducativos] =useState([]);
  const [finalArray,setArray]=useState([])

  useEffect(()=>{
     props.getSubjects()
     .then(subjects=>{
           setExistentes(subjects.map(subject=>subject.name.toLowerCase()))
         
     });
     props.getAcademicLevels()
     .then(l=>l.map(l=>l.name))
     .then(l=>setNivelesEducativos(l))
  },[])

  useEffect(()=>{
      setSubmit(!existentes.includes(materia.toLowerCase()) && materia.length>4)
 },[materia])


  const handleAddition = (materia) => {
   
    setMaterias(...materias,materia);
  };

  
  useEffect(()=>{
    setNiveles({})
  },[error])

  const handleNiveles = (nivel) => {
    setNiveles({...niveles,
      [nivel.target.value]:nivel.target.checked
    })
  };
  
  const handleGeneral = () => {
    
    let nivEd = '';
        for(let i in niveles){
          if(niveles[i]) nivEd+= '|'+i;
        }nivEd+='|'
          if(nivEd=='|') {
          Swal.fire('Debes seleccionar al menos un Grado') 
          return}
    Swal.fire({
      title: `¿Aceptas añadir la materia ${materia}?`,
      html: `Se agregará la materia a los siguientes Grados:
      ${nivEd}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        return materia
         }
      
        
      }).then((materia)=> props.postSubject({name:materia}))
      .then(materia=>{
        var array=[];
        var array2=[]
        for(let i in niveles){
          if(niveles[i]) {
          array.push(props.academicLevels.find(sub => sub.name == i))
          }
        }
      for(let i =0;i<array.length;i++){
        array2.push(
                axios.post(`http://localhost:3001/academicLevelXSubject/${array[i].id}`,{subjectsId:materia.id}, {withCredentials: true})
              )
}       
              Promise.all(array2)
              .then(()=> console.log('listo'))
      })
  };



  return (
    <div className={classes.root}>
      <Paper elevation={6} className={classes.paper} >
      <Grid style={{margin:10}}>
           
                    <Grid style={{justifyContent:'center'}} container>
                        <AgregarMateriaForm handleGeneral={handleGeneral} add={handleAddition} setmateria={setMateria} error={error}/>
                    </Grid>
                    <Grid style={{justifyContent:'center',margin:10}} container>

                    <NivelesAcademicos show={!error } niveles={nivelesEducativos} setmaterias={handleNiveles}/>
                    </Grid>

      </Grid>


      </Paper>
    </div>
  );
}


 function AgregarMateriaForm({handleGeneral,add,setmateria,error}) {
  const classes = useStyles();
  const [materia, setMateria] = useState('');

  const handleChange = (event) => {
    setMateria(event.target.value);
    setmateria(event.target.value);
  };


  return (
      <>
            <Grid item xs={3} style={{margin:10}}>
                            <TextField
                                variant='outlined'
                                label='Nombre de Materia'
                                value={materia}
                                error={!error && materia.length}
                                onChange={handleChange}
                                helperText="Los nombres no pueden repetirse"
                            />
                            <Fab onClick={handleGeneral} disabled={!error} style={{marginLeft:20, background:`${!error?'primary':VERDE}`}}  aria-label="Add" >
                              
                                 <AddIcon style={{color:'white'}} disableRipple/>
                             </Fab>
              </Grid>
             
     </>
  )
}



function NivelesAcademicos({show,niveles,setmaterias}) {

  return (
      <>
            <Grid item xs={6} style={{margin:10}}>
              {niveles && !show ? niveles.map(nivel=>(
               <React.Fragment key={nivel}>
                        <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e)=>setmaterias(e)}
                            color="primary"
                            value={nivel}
                          />
                    
                        }
                        label={nivel}
                        />
                  </React.Fragment>
              )
              ):''}
          
              
              </Grid>
            
     </>
  )
}









function mapStateToProps(state) {
  return {
      subjects:state.subjects.subjects,
      academicLevels:state.academic.academicLevels
  };
}

function mapDispatchToProps(dispatch) {
  return {
      getSubjects:() => dispatch(getSubjects()),
      getAcademicLevels:() => dispatch(getAcademicLevels()),
      deleteSubject:(subjectId) => dispatch(deleteSubject(subjectId)),
      postSubject: (subject) => dispatch(postSubject(subject)),
      putSubject: subject => dispatch(putSubject(subject)),

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AgregarMateria);