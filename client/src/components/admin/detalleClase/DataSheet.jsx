import React, {useState, useRef} from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {addDataSheet} from '../../../redux/actions/users'
import {connect} from 'react-redux'
import style from './DataSheet.module.css'

function DataSheet({addDataSheet, classId, assistance}){
   const [estado, setEstado] = useState({classId})
   let si = useRef(null); let no = useRef(null)
   let yes = useRef(null); let nop = useRef(null)

   const handleChecked = (e, type) => {
      if(e.target.checked){
         setEstado({...estado, [e.target.name]: e.target.value})
         if(type === 'comp'){
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
      <div className={style.contenedor}>
         <h1 className={style.tituloPrincipal} > Datos de la clase </h1>
         <div className = {style.form}> 
            <h4 className={style.titulo}> ¿Cómo es tu relación con tu alumno? </h4>
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
            <Rating
               name="relation"
               defaultValue={0}
               precision={1}
               emptyIcon={<StarBorderIcon fontSize="inherit" />}
               onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
            />
            </Box>
         
         <div> 
            <h4 className={style.titulo}> ¿Qué tan motivado estás para seguir brindando apoyo escolar? </h4>
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
            <Rating
               name="assesorMotivation"
               defaultValue={0}
               precision={1}
               emptyIcon={<StarBorderIcon fontSize="inherit" />}
               onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
            />
            </Box>
         </div>
         <div> 
            <h4 className={style.titulo}> ¿Consideras que estás haciendo una diferencia a tu tutoreado? </h4>
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
            <Rating
               name="difference"
               defaultValue={0}
               precision={1}
               emptyIcon={<StarBorderIcon fontSize="inherit" />}
               onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
            />
            </Box>
         </div>
         <div> 
            <h4 className={style.titulo}> ¿Sentís que tu trabajo está siendo valorado? </h4>
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
            <Rating
               name="valued"
               defaultValue={0}
               precision={1}
               emptyIcon={<StarBorderIcon fontSize="inherit" />}
               onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
            />
            </Box>
         </div>
         <div> 
            <h4 className={style.titulo}> ¿Te gustaría seguir trabajando con tu alumno? </h4>
            <div style={{marginTop: '1%'}}>
            <input type="checkbox" ref={si} value="true" name="stay" 
               onChange={(e) => handleChecked(e, 'comp')}/>
               <label htmlFor="true" style={{ marginRight: "20px", marginLeft: "5px"}}> Si </label>
               <input type="checkbox"  ref={no} value="false" name="stay" 
               onChange={(e) => handleChecked(e, 'comp')}/>
               <label htmlFor="false" style={{ marginRight: "20px", marginLeft: "5px"}}> No </label><br></br>
               </div>
         </div>
         <div style={{marginTop: '3%'}}> 
            <h4 className={style.titulo}> Conexión a internet </h4>
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
               <Rating
                  name="internetConnection"
                  defaultValue={0}
                  precision={1}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
               />
            </Box>
         </div>
         <div> 
            <h4 className={style.titulo}> ¿Notaste dificultades en su desempeño? </h4>
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
               <Rating
                  name="performance"
                  defaultValue={0}
                  precision={1}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
               />
            </Box>
         </div>
         <div> 
            <h4 className={style.titulo}> ¿Estaba acompañado? </h4>
            <div style={{marginTop: '1%'}}>
               <input type="checkbox" ref={si} value="true" name="someoneAccompaniesHim" 
               onChange={(e) => handleChecked(e, 'comp')}/>
               <label htmlFor="true" style={{ marginRight: "20px", marginLeft: "5px"}}> Si </label>
               <input type="checkbox"  ref={no} value="false" name="someoneAccompaniesHim" 
               onChange={(e) => handleChecked(e, 'comp')}/>
               <label style={{ marginRight: "20px", marginLeft: "5px"}} htmlFor="false"> No </label><br></br>
               </div>
            {estado.someoneAccompaniesHim === 'true' ? 
            <div> 
               <h4 className={style.titulo}> ¿Quién lo acompañaba? </h4>
               <div style={{marginTop: '1%'}}>
               <input name="companionName" value={estado?.companionName} onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}/>
               </div>
            </div>
            : null }
         </div>
         <div style={{marginTop: '3%'}}>
         <h4 className={style.titulo}> Comentarios adicionales</h4>
         <div style={{marginTop: '1%'}}>
         <textarea style = {{display: 'block'}} className={style.comentarios} name="comments" value={estado?.comments} 
         onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}/>
         </div>
         </div>
         <div style={{marginTop: '5%'}}> 
            <h4 className={style.titulo}> ¿Tuvo examen? </h4>
            <div style={{marginTop: '1%'}}>
               <input type="checkbox" ref={yes} value="true" name="hadExam" 
               onChange={(e) => handleChecked(e, 'exam')}/>
               <label htmlFor="true" style={{ marginRight: "20px", marginLeft: "5px"}}> Si </label>
               <input type="checkbox"  ref={nop} value="false" name="hadExam" 
               onChange={(e) => handleChecked(e, 'exam')}/>
               <label htmlFor="false" style={{ marginRight: "20px", marginLeft: "5px"}}> No </label><br></br>
               </div>
            { estado.hadExam === 'true' ?
            <div style={{marginTop: '3%'}}>  
               <h4 className={style.titulo}> Calificación </h4>
                  <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
                     <Rating
                        name="qualification"
                        defaultValue={0}
                        precision={1}
                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
                     />
                  </Box>
               </div> : null}
         </div>
         <div style = {{marginTop: '1%'}}> 
            <h4 className={style.titulo}> Actitud </h4> 
            <Box style={{marginTop: '1%'}} component="fieldset" mb={3} borderColor="transparent">
               <Rating
                  name="attitude"
                  defaultValue={0}
                  precision={1}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  onChange={(e) => setEstado({...estado, [e.target.name]: e.target.value})}
               />
            </Box>
         </div>
         <button className={style.boton} 
         onClick={() => {
            let newEstado = {...estado, assistance}
            addDataSheet(newEstado)
            }} > Enviar </button> 
            </div>
      </div> 
   )
}

export default connect(null, {addDataSheet})(DataSheet)