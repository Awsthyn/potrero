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
      createdAt,
      state,
      email,
      id,
      isActive,
      linkedin,
      cv,
      frontDNI,
      backDNI,
      phone,
      birthday,
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
        console.log(id);
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
        <Paper className={classes.papereff} elevation={10}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={styles.typography}
                  component='h2'
                  gutterBottom
                >
                  <label className={styles.label}>
                    Postulante:
                    <input className={styles.data} readOnly type="text" value={`${firstName} ${lastName}`}/>
                  </label> 
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={styles.typography}
                  component='h2'
                  gutterBottom
                >
                  <label className={styles.label}>
                    Email:
                    <input className={styles.data} readOnly type="text" value={email}/>
                  </label> 
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={styles.typography}
                  component='h2'
                  gutterBottom
                >
                      <label className={styles.label}>
                        LinkedIn:
                        <div><a className={styles.link} href={linkedin} target='_blank'> Ver Perfil de LinkedIn </a></div>
                      </label>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={styles.typography}
                  component='h2'
                  gutterBottom
                >
                  <label className={styles.label}>
                    Fecha de Postulación:
                    <input className={styles.data} readOnly type="text" value={`${moment(createdAt).format('L')}`}/>
                  </label>
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={styles.typography}
                  component='h2'
                  gutterBottom
                >
                  <label className={styles.label}>
                    Edad:
                    <input className={styles.data} readOnly type="text" value={`${Number(moment().get('year')) - Number(moment(birthday).get('year'))} años`}/>
                  </label>
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={styles.typography}
                  component='h2'
                  gutterBottom
                >
                  <label className={styles.label}>
                    Teléfono:
                    <input className={styles.data} readOnly type="text" value={phone}/>
                  </label>
                </Typography>
              </Grid>
              <Grid
                container
                justify='center'
                spacing={2}
              >
                <label className={styles.labelFile} style={{marginBottom:'0', paddingBottom:'0'}}>
                  Curriculum:
                </label>
                  {
                      (!cv || !cv.split('.')[1]) ? 
                      <h5 style={{marginBottom: '10px', marginTop: '5px', textAlign:'center'}}>No se encontro el CV</h5> 
                    :
                      (
                        <div style={{display:'flex', justifyContent:'center', marginTop:'0'}}>
                        {
                          viewCV ?
                            <div className={styles.hideFiles} style={{width:'100%'}}>
                              <button className={styles.btnFiles} onClick={() => mostrarCV()}>Ocultar CV</button>
                              <object
                                data={`http://localhost:3001/uploads/cv/${cv}`}
                                type='application/pdf'
                                width='800px'
                                height='700px'
                              />
                            </div>
                          : 
                            <div className={styles.viewFiles}><button className={styles.btnFiles} onClick={() => mostrarCV()}>Ver CV</button></div>
                        } 
                        </div>
                      ) 
                  }
              </Grid>
              <Grid
                container
                justify='center'
                spacing={2}
              >
                <label className={styles.labelFile} style={{marginBottom:'0', paddingBottom:'0'}}>Foto del DNI:</label>
                {
                  (!frontDNI || !frontDNI.split('.')[1] || !backDNI || !backDNI.split('.')[1]) ? 
                    <h5 style={{marginBottom: '10px', marginTop: '5px', textAlign:'center'}}>No se encontro la imagen de DNI</h5>
                   : 
                   (
                      <div style={{display:'flex', justifyContent:'center', marginTop:'0'}}>
                        {
                          viewDNI ?
                            <div className={styles.hideFiles} style={{width:'100%'}}>
                              <button className={styles.btnFiles} onClick={() => mostrarDNI()}>Ocultar Foto del DNI</button>
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
                            <div className={styles.viewFiles}><button className={styles.btnFiles} onClick={() => mostrarDNI()}>Ver Foto del DNI</button></div>
                        }
                      </div>
                  )
                }
              </Grid>
              <Grid
                container
                justify='center'
                spacing={2}
              >
                {/* <Link to={`/admin/voluntarios/detalleHorarios/${id}`}><h4>Ver detalle de los horarios seleccionados</h4></Link> */}
                <h4>Detalle de los horarios seleccionados por el voluntario</h4>
                <DetalleHorariosVoluntario schedule={props.schedule} />
              </Grid>


              <Grid
                className={classes.typo}
                container
                justify='center'
                spacing={2}
              >
                <button
                  key={`aceptar${id}`}
                  className={`${
                    state === 'pendiente' ? 'btn-warning' : 'btn-success '
                    } btn border`}
                  onClick={() =>
                    handleStatusChange({ id, firstName, lastName })
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
                  key={`rechazar${id}`}
                  name={Number(id)}
                  className='btn btn-danger border'
                  onClick={(e) => handleDeletion(id)}
                >
                  <i name={id} className='fa fa-trash'>
                    Rechazar
                  </i>
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
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
    getVolunteers: () => dispatch(getVolunteers()),
    deleteVolunteer: (id) => dispatch(deleteVolunteer(id)),
    acceptVolunteer: (id) => dispatch(acceptVolunteer(id)),
    getUserSchedule: (id) => dispatch(getUserSchedule(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleVoluntario);