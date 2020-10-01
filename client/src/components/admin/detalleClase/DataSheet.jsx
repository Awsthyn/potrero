import React, {useState, useRef} from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {addDataSheet} from '../../../redux/actions/users'
import {connect} from 'react-redux'
import style from './DataSheet.module.css'
import axios from 'axios'
import Swal from 'sweetalert2'

function DataSheet({addDataSheet, classId, assistance, studentId, email}){
   const [estado, setEstado] = useState({classId})
   let si = useRef(null); let no = useRef(null)
   let yes = useRef(null); let nop = useRef(null)
   let s = useRef(null); let n = useRef(null)

   const handleChecked = (e, type) => {
      if(e.target.checked){
         setEstado({...estado, [e.target.name]: e.target.value})
         if(type === 'comp'){
            if(e.target.value === 'true'){
               no.current.checked = false
            }else{
               si.current.checked = false
            }
         }else if(type === 'exam'){
            if(e.target.value === 'true'){
               nop.current.checked = false
            }else{
               yes.current.checked = false
            }
         }else {
            if(e.target.value === 'true'){
               n.current.checked = false
            }else{
               s.current.checked = false
            }
         }
      }else{
         setEstado({...estado, [e.target.name]: null})
      }
   }

   const handleEnviar = () => {
      // SI AL CREAR EL DATASHEET HAY UNA FALTA INJUSTIFICADA SE HACE UNA PETICION PARA SABER LA CANTIDAD DE FALTAS
         if(assistance === 'no justificada'){
            axios.get(`http://localhost:3001/stats/assistances/${studentId}`)
            .then(student => {
               // SI HAY MAS DE 2 INJUSTIFICADAS APARECE EL CARTEL PREGUNTANDO SI QUERES MANDAR UN EMAIL, APARAECE TODAS LAS VECES QUE SE COMPLETA EL DATASHEET SI UN ALUMNO TIENE >= 2 INJUSTIICADAS
               if(student.data.ausenteInjustificado >= 2) {
                  Swal.fire({
                     title: 'Atención',
                     text: `El alumno tiene ${student.data.ausenteInjustificado} faltas injustificadas y ${student.data.ausenteJustificado} faltas justificadas. ¿Te gustaría enviar un email de advertencia? `,
                     icon: 'warning',
                     showCancelButton: true,
                     confirmButtonColor: '#3085d6',
                     cancelButtonColor: '#d33',
                     cancelButtonText: 'Cancelar',
                     confirmButtonText: 'Enviar mail'
                  }).then((result) => {
                     // SI QUIERE ENVIAR UN EMAIL APARECE UN TEXTAREA PARA ESCRIBIR EL MSJ
                  if (result.isConfirmed) {
                     Swal.fire({
                        input: 'textarea',
                        inputPlaceholder: 'Type your message here...',
                        inputAttributes: {
                           'aria-label': 'Type your message here'
                        },
                        showCancelButton: true
                        }).then(text =>{
                           // SI SE CONFIRMA SE ENVIA EL MAIL AL ALUMNO
                           if(text.isConfirmed){
                              axios.post(`http://localhost:3001/mailPersonal/studentEmail`, {email, asunto: 'Advertencia faltas', mensaje: text.value })
                              .then(resp => console.log(resp))
                              .catch(error => console.log(error))
                              Swal.fire(
                                 'EXCELENTE',
                                 '¡Email y formulario enviados exitosamente!',
                                 'success'
                               )
                           }
                        })
                  }
                })}
            })
            .catch(error => console.log(error))
         }
         let newEstado = {...estado, assistance}
         addDataSheet(newEstado)
         Swal.fire(
            'EXCELENTE',
            '¡Formulario completado exitosamente!',
            'success'
          )
         
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
            <input type="checkbox" ref={s} value="true" name="stay" 
               onChange={(e) => handleChecked(e, 'seguir')}/>
               <label htmlFor="true" style={{ marginRight: "20px", marginLeft: "5px"}}> Si </label>
               <input type="checkbox"  ref={n} value="false" name="stay" 
               onChange={(e) => handleChecked(e, 'seguir')}/>
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
                        precision={0.5}
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
         onClick={() => handleEnviar() } > Enviar </button> 
            </div>
      </div> 
   )
}

export default connect(null, {addDataSheet})(DataSheet)