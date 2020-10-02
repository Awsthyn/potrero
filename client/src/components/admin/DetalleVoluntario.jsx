import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  getVolunteers,
  deleteVolunteer,
  acceptVolunteer,
} from '../../redux/actions/voluntary';
import {
  getUserSchedule
} from '../../redux/actions/userSchedule.js';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import swal from 'sweetalert';
import 'moment/locale/es';
import styles from './DetalleVoluntario.module.css';
import moment from 'moment';
import DetalleHorariosVoluntario from './DetalleHorariosVoluntario';
import AccordionSummary from '@material-ui/core/AccordionSummary';
moment.locale('es');

const VIOLETA = '#492BC4';
const VERDE = '#8CC63E';
const NEGRO = '#333333';

const useStyles = makeStyles({
  root: {
    // width: `calc(100% - ${400}px)`,
    // marginTop: 100,
    // fontFamily: 'Poppins',
    // // marginLeft: 300,
    // display: 'flex',
    // justifyContent: 'center',
  },
  font: {
    fontFamily: 'Poppins',
    margin: 5,
  },
  detail: {
    maxWidth: 345,
  },
  banner: {
    height: 140,
  },
  pepereff: {
    // margin: 'inherit',
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typo: {
    // margin: 10,
    display: 'flex',
    justifyContent: 'center'
  },
});

function DetalleVoluntario(props) {
  if (props.voluntarios.length)
    var {
      firstName,
      lastName,
      email,
      birthday,
      createdAt,
      state,
      id,
      linkedin,
      cv,
      frontDNI,
      backDNI,
      phone
    } = props.voluntarios.filter((v) => v.id == props.id)[0];


    useEffect(() => {
      props.getVolunteers();
      props.getUserSchedule(props.id);
    }, []);

  const [viewCV, setViewCV] = useState(false);
  const [viewDNI, setViewDNI] = useState(false);

  const classes = useStyles();

  const mostrarCV = () => {
    viewCV ? setViewCV(false) : setViewCV(true);
  }

  const mostrarDNI = () => {
    viewDNI ? setViewDNI(false) : setViewDNI(true);
  }

  function handleDeletion(id) {
    swal({
      title: '¡¡ Cuidado !!',
      text:
        'No se recomienda en lo absoluto este tipo de acciones. Si continúa, estará eliminando datos muy valiosos... Se recomienda simplemente rechazar al postulante',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.deleteVolunteer(Number(id));
        swal('El registro fue destruido con éxito', {
          icon: 'success',
        });
      } else {
        swal('El registro fue conservado');
      }
    });
  }

  function handleStatusChange(volunteer) {
    swal({
      title: `Estás por dar de alta a ${firstName} ${lastName} como voluntario.`,
      text:
        '¿Está seguro? Si confirma esta acción, el voluntario se convertirá en asesor.',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    }).then((confirm) => {
      if (confirm) {
        console.log(volunteer)
        props.acceptVolunteer(volunteer);
        swal('El usuario se convirtió en asesor.', {
          icon: 'success',
        });
      } else {
        swal('No se pudo convertir en asesor al usuario.');
      }
    });
  }

  return (
    <div className={styles.contenedor}>
      {props.voluntarios.length ? (
        <div>
          <button className={styles.btnRegresar} onClick={()=> window.history.go(-1)}>
            <svg viewBox="0 0 16 16" class={styles.leftArrow} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            Regresar
          </button>
          <h1 className="mb-3 mt-2" style={{ fontWeight: '500', paddingBottom: '10px', fontFamily:'Poppins, sans-serif'}}>
            Detalles del voluntario
          </h1>
          <div>
            <div>
              <div className={styles.containerGrids}>
                  <div className={styles.containerLabels}>
                    <label className={styles.label}>
                      Nombre:
                      <input className={styles.data} readOnly type="text" value={firstName}/>
                    </label> 
                  </div>
                  <div className={styles.containerLabels}>
                    <label className={styles.label}>
                      Apellido:
                      <input className={styles.data} readOnly type="text" value={lastName}/>
                    </label> 
                  </div>
              </div>
              <div className={styles.containerGrids}>
              <div className={styles.containerLabels} >
                  <label className={styles.label}>
                    Teléfono:
                    <input className={styles.data} readOnly type="text" value={phone}/>
                  </label>
                </div>
                <div className={styles.containerLabels}>
                  <label className={styles.label}>
                    Email:
                    <input className={styles.data} readOnly type="text" value={email}/>
                  </label> 
                </div>
              </div>
              <div className={styles.containerGrids}>
                <div className={styles.containerLabels}>
                  <label className={styles.label}>
                    Fecha Nacimiento:
                    <input className={styles.data} readOnly type="text" value={`${moment(birthday).format('L')}`}/>
                  </label>
                </div>
                <div className={styles.containerLabels}>
                  <label className={styles.label}>
                    Edad:
                    <input className={styles.data} readOnly type="text" value={`${Number(moment().get('year')) - Number(moment(birthday).get('year'))} años`}/>
                  </label>
                </div>
              </div>
              <div className={styles.containerGrids}>
                <div className={styles.containerLabels}>
                  <label className={styles.label}>
                    Fecha Postulación:
                    <input className={styles.data} readOnly type="text" value={`${moment(createdAt).format('L')}`}/>
                  </label>
                </div>
                <div className={styles.containerLabels}>
                  <label className={styles.label}>
                    LinkedIn:
                    <div><a className={styles.link} href={linkedin} target='_blank'> Ver Perfil de LinkedIn </a></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div>
                {
                    (!cv || !cv.split('.')[1]) ? 
                    <h5 style={{marginBottom: '20px', marginTop: '20px', textAlign:'center', color:'red'}}>No se encontró el CV</h5> 
                  :
                    (
                      <div style={{display:'flex', justifyContent:'center', marginTop:'0'}}>
                      {
                        viewCV ?
                          <div className={styles.hideFiles} style={{width:'100%'}}>
                            <button className={styles.btnFiles} onClick={() => mostrarCV()}>
                              <AccordionSummary className={styles.summary} expandIcon={<span className="material-icons" style={{alignItems:'center'}}>expand_less</span>}>
                                Ocultar CV 
                              </AccordionSummary>
                              </button>
                            <object
                              data={`http://localhost:3001/uploads/cv/${cv}`}
                              type='application/pdf'
                              width='750px'
                              height='700px'
                            />
                          </div>
                        : 
                          <div className={styles.viewFiles}>
                            <button className={styles.btnFiles} onClick={() => mostrarCV()} style={{marginTop:'15px'}}>
                              <AccordionSummary className={styles.summary} expandIcon={<span className="material-icons">expand_more</span>}>
                                Ver CV
                              </AccordionSummary>
                            </button>
                          </div>
                      } 
                      </div>
                    ) 
                }
              </div>
              <div
              >
                {
                  (!frontDNI || !frontDNI.split('.')[1] || !backDNI || !backDNI.split('.')[1]) ? 
                    <h5 style={{marginBottom: '30px', marginTop: '10px', textAlign:'center', color:'red'}}>No se encontro la imagen del DNI</h5>
                   : 
                   (
                      <div style={{display:'flex', justifyContent:'center', marginTop:'0'}}>
                        {
                          viewDNI ?
                            <div className={styles.hideFiles} style={{width:'100%'}}>
                              <button className={styles.btnFiles} onClick={() => mostrarDNI()}>
                                <AccordionSummary className={styles.summary} expandIcon={<span className="material-icons" style={{alignItems:'center'}}>expand_less</span>}>
                                  Ocultar DNI
                                </AccordionSummary>
                                
                                </button>
                              <div className={styles.divImg} style={{width:'100%', margin:'10px', display:'flex', justifyContent:'space-around'}}>
                                <img
                                  className={styles.dni}
                                  src={`http://localhost:3001/uploads/dni/${frontDNI}`}
                                  width='48%'
                                  height='40%'
                                />
                                <img
                                  className={styles.dni}
                                  src={`http://localhost:3001/uploads/dni/${backDNI}`}
                                  width='48%'
                                  height='40%'
                                />
                              </div>
                            </div>
                          : 
                            <div className={styles.viewFiles}>
                              <button className={styles.btnFiles} onClick={() => mostrarDNI()}>
                                <AccordionSummary className={styles.summary} expandIcon={<span className="material-icons">expand_more</span>}>
                                  Ver DNI
                                </AccordionSummary>
                              </button>
                            </div>
                        }
                      </div>
                  )
                }
              </div>
              <div className={styles.containerdetalleHorarios}>
                <h4>Detalle de los horarios seleccionados por el voluntario</h4>
                <DetalleHorariosVoluntario schedule={props.schedule} />
              </div>
              <div className={styles.divAcciones}>
                <button
                style={{margin:10}}

                  key={`aceptar${id}`}
                  className={`${
                    state === 'pendiente' ? 'btn-primary' : 'btn-success '
                    } btn border`}
                  onClick={() =>
                    handleStatusChange({ id, firstName, lastName,email })
                  }
                >
                  <i
                    className={`${
                      state === 'pendiente'
                        ? 'fa fa-toggle-off'
                        : 'fa fa-toggle-on'
                      }`}
                  ></i>
                  {state === 'pendiente' ? 'Aceptar' : 'Activo'}
                </button>
                <button
                style={{margin:10}}
                  key={`rechazar${id}`}
                  name={Number(id)}
                  className='btn btn-danger '
                  onClick={(e) => handleDeletion(id)}
                >
                  <i name={id} className='fa fa-trash'>
                    Rechazar
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
          'Loading'
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  voluntarios: state.volunteers.volunteers,
  schedule: state.userSchedule.schedule
});

const mapDispatchToProps = (dispatch) => {
  return {
    getVolunteers:() => dispatch(getVolunteers()),
    deleteVolunteer: (id) => dispatch(deleteVolunteer(id)),
    acceptVolunteer: (id) => dispatch(acceptVolunteer(id)),
    getUserSchedule: (id) => dispatch(getUserSchedule(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleVoluntario);