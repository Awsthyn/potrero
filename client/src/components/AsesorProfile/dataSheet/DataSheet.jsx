import React, {useState, useRef} from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {addDataSheet} from '../../../redux/actions/users'
import {connect} from 'react-redux'

function DataSheet(){
   const [estado, setEstado] = useState({})
   let ausente = useRef(null); let presente = useRef(null); let tardanza = useRef(null)
   let si = useRef(null); let no = useRef(null)
   let yes = useRef(null); let nop = useRef(null)

   const handleChecked = (e, type) => {
      if(e.target.checked){
         setEstado({...estado, [e.target.name]: e.target.value})
         if(type === 'asist') { 
            let asistencia = [ ausente, presente, tardanza]
            asistencia.map(a => {
               if(a.current.value !== e.target.value){
                  return a.current.checked = false
               }
            }) 
         }else if(type === 'comp'){
            if(e.target.value === 'true'){
               no.current.checked = false
            }else{
               si.current.checked = false
            }
         }else{
            if(e.target.value === 'true'){
               nop.current.checked = false
            }else{
               yes.current.checked = false
            }
         }
      }else{
         setEstado({...estado, [e.target.name]: null})
      }
   }

   return (
      <div>
         <h1> Datos de la clase </h1> 
         <h4> Concentracion </h4>
         <Box component="fieldset" mb={3} borderColor="transparent">
         <Rating
            name="concentration"
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value * 2})}
         />
      </Box>
         <h4> Asistencia </h4>
            <input type="checkbox" ref={presente} value="presente" name="assistance" 
            onChange={(e) => handleChecked(e, 'asist')}/>
            <label htmlFor="presente"> Presente </label><br></br>
            <input type="checkbox"  ref={ausente} value="ausente" name="assistance" 
            onChange={(e) => handleChecked(e, 'asist')}/>
            <label htmlFor="ausente"> Ausente </label><br></br>
            <input type="checkbox"  ref={tardanza} value="tardanza" name="assistance" 
            onChange={(e) => handleChecked(e, 'asist')}/>
            <label htmlFor="tardanza"> Tarde </label><br></br>
         <h4> Conexion a internet </h4>
         <Box component="fieldset" mb={3} borderColor="transparent">
         <Rating
            name="internetConnection"
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value * 2})}
         />
      </Box> 
         <h4> Desempeño </h4>
      <Box component="fieldset" mb={3} borderColor="transparent">
         <Rating
            name="performance"
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value * 2})}
         />
      </Box>
         <h4> estaba acompañado </h4>
            <input type="checkbox" ref={si} value="true" name="someoneAccompaniesHim" 
            onChange={(e) => handleChecked(e, 'comp')}/>
            <label htmlFor="true"> Si </label><br></br>
            <input type="checkbox"  ref={no} value="false" name="someoneAccompaniesHim" 
            onChange={(e) => handleChecked(e, 'comp')}/>
            <label htmlFor="false"> No </label><br></br>
         {estado.someoneAccompaniesHim === 'true' ? 
         <div> 
            <h4> quien lo acopañaba </h4>
            <input name="companionName" value={estado?.companionName} onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}/>
         </div>
         : null }
         <h4> comentarios </h4>
         <textarea name="comments" value={estado?.comments} onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}/>
         <h4> tiene examen </h4>
            <input type="checkbox" ref={yes} value="true" name="hadExam" 
            onChange={(e) => handleChecked(e, 'exam')}/>
            <label htmlFor="true"> Si </label><br></br>
            <input type="checkbox"  ref={nop} value="false" name="hadExam" 
            onChange={(e) => handleChecked(e, 'exam')}/>
            <label htmlFor="false"> No </label><br></br>
         <h4> calificacion </h4>
      <Box component="fieldset" mb={3} borderColor="transparent">
         <Rating
            name="qualification"
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value * 2})}
         />
      </Box>
         <h4> duracion </h4> 
         <input type="number" name="duration"  
         onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})} />
         <h4> actitud </h4> 
      <Box component="fieldset" mb={3} borderColor="transparent">
         <Rating
            name="attitude"
            defaultValue={0}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value * 2})}
         />
      </Box> 
         <button onClick={() => addDataSheet(estado)} > Enviar </button> 
      </div> 
   )
}

export default connect(null, {addDataSheet})(DataSheet)