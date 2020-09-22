import React, {useState,useEffect} from 'react'
import { connect } from "react-redux";
import {makeStyles} from '@material-ui/styles';
import { getVolunteers, deleteVolunteer, acceptVolunteer} from "../../redux/actions/voluntary"
import moment from 'moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import {Link,Redirect} from 'react-router-dom'
import {Paper, Table, TableBody,TableRow,TableCell,TableHead, ButtonGroup, Button} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FaceIcon from '@material-ui/icons/Face';
moment.locale('es');



const useStyles = makeStyles(() => ({
   
  }));

export const TablaVoluntarios2 = (props) => {

    const classes = useStyles()

        useEffect(()=>{
            props.getVolunteers();
        },[])

    return (
        <div className='container' style={{marginLeft:220, marginTop: 40}}>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Fecha de postulación</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.volunteers.length && props.volunteers.map((voluntario) => (
                                <TableRow key={voluntario.name}>
                                        <TableCell component="th" scope="row">{voluntario.firstName}</TableCell>
                                        <TableCell align="right">{voluntario.lastName}</TableCell>
                                        <TableCell align="right">{voluntario.email}</TableCell>
                                        <TableCell align="right">{moment(voluntario.createdAt).format('LLL')}hs</TableCell>
                                        <TableCell align="right">
                                        {
                                        <ButtonGroup variant="contained"  aria-label="contained primary button group" key={`detalles${voluntario.id}`}>
                                                  
                                                    <Link color ="primary" to={`/admin/voluntarios/${voluntario.id}`} key={`detalles${voluntario.id}`} className="btn btn-primary" type="button">
                                                             <FaceIcon/> Detalles
                                                    </Link>
                                                    <Button color="secondary">
                                                                <DeleteForeverIcon/> Eliminar   
                                                    </Button>
                                        </ButtonGroup>
                                        }
                                        </TableCell>
                                </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}





const mapStateToProps = (state) => ({
        volunteers:state.volunteers.volunteers,
})


const mapDispatchToProps = (dispatch) => ({
        getVolunteers:() => dispatch(getVolunteers()),
        deleteVolunteer:(id) => dispatch(deleteVolunteer(id)),
        acceptVolunteer: (id) => dispatch(acceptVolunteer(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TablaVoluntarios2)
