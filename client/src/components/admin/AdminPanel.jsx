import React from 'react'
import {Link} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

const useStyles = makeStyles({
    root:{
        width:`calc(100% - ${220}px)`,
        marginLeft: 220,
    },
    font:{
        fontFamily: 'Poppins',
    },
})

export default () => {
    const classes = useStyles()
             return    (
                 <div className={classes.root}>
                    <div className="jumbotron">
                        <h1 className="display-4">Panel de ADMIN</h1>
                        <p className="lead">Este panel está en construcción</p>
                        <hr className="my-4"/>
                        <p>De todas maneras, podemos encontrar funcionando la administración pertinente a:</p>
                        <div className="container-fluid">
                            <Link to='/admin/estudiantes' type="button" className="ml-3 btn btn-primary border"> Alumnos </Link>
                            <Link to='/admin/voluntarios/' type="button" className="ml-3 btn btn-primary border"> Voluntarios/Postulantes </Link>
                            <Link to='/admin/usuarios' type="button" className="ml-3 btn btn-warning border"> Docentes </Link>
                            <Link to='/admin/materias' type="button" className="ml-3 btn btn-danger border"> Materias </Link>
                        </div>
                    </div>
                </div>
                )
        }