import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import moment from 'moment';
import swal from 'sweetalert';
import 'moment/locale/es';
moment.locale('es');

const VIOLETA = '#492BC4';
const VERDE = '#8CC63E';
const NEGRO = '#333333';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: `calc(100% - ${400}px)`,
    marginTop: 100,
    fontFamily: 'Poppins',
    marginLeft: 300,
    justifyContent: 'center',
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
    margin: 'inherit',
    elevation: 5,
  },
  typo: {
    margin: 10,
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
      phone,
      birthday,
    } = props.voluntarios.filter((v) => v.id == props.id)[0];

  const classes = useStyles();

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
    <div className={classes.root}>
      {props.voluntarios.length ? (
        <Paper className={classes.papereff} elevation={10}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={classes.typo}
                  component='h2'
                  gutterBottom
                >
                  <b>Postulante:</b> {firstName} {lastName}
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={classes.typo}
                  component='h2'
                  gutterBottom
                >
                  <b> Email:</b> {email}
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={classes.typo}
                  component='h2'
                  gutterBottom
                >
                  <b> LinkedIn:</b> <a href={linkedin}>LinkedIn</a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={classes.typo}
                  component='h2'
                  gutterBottom
                >
                  <b>Fecha de Postulación:</b> {moment(createdAt).format('LLL')}
                  hs
                </Typography>
              </Grid>
              <Grid container justify='center' spacing={2}>
                <Typography
                  className={classes.typo}
                  component='h2'
                  gutterBottom
                >
                  <b>Teléfono:</b> {phone}
                </Typography>
              </Grid>
              <Grid
                className={classes.typo}
                container
                justify='center'
                spacing={2}
              >
                <b>Curriculum:</b>
                {!cv ? 'Sin CV' : ''}
                <br />
                {cv ? (
                  <object
                    data={`http://localhost:3001/uploads/${cv}`}
                    type='application/pdf'
                    width='90%'
                    height='300px'
                  />
                ) : (
                  ''
                )}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteVolunteer: (id) => dispatch(deleteVolunteer(id)),
    acceptVolunteer: (id) => dispatch(acceptVolunteer(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleVoluntario);