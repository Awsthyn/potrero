import React from 'react'
import {Link} from 'react-router-dom'


export default () => 
                <div className="jumbotron">
                    <h1 className="display-4">Panel de ADMIN</h1>
                    <p className="lead">Este panel está en construcción</p>
                    <hr className="my-4"/>
                    <p>De todas maneras, podemos encontrar funcionando la administración pertinente a:</p>
                    <div className="container-fluid">
                        <Link to='/admin/voluntarios/' type="button" className="btn btn-primary border"> Voluntarios/Postulantes </Link>
                        <Link to='/admin/usuarios/' type="button" className="btn btn-warning border"> Docentes </Link>
                        <Link to='/admin/materias/' type="button" className="btn btn-danger border"> Materias </Link>
                    </div>
                </div>
        