// React, HOOK de estado y efecto y REDUX
import React, {useState,useEffect} from 'react'
import { connect } from "react-redux";
// Estilos
import {makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider,useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//Actions
import { getVolunteers, deleteVolunteer, acceptVolunteer} from "../../redux/actions/voluntary"
// Moment
import moment from 'moment';
import 'moment/locale/es';
// Sweet Alerts
import swal from 'sweetalert';
import {Link,Redirect} from 'react-router-dom'


//Material-UI Components
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FaceIcon from '@material-ui/icons/Face';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
moment.locale('es');

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: 20,
  },
}));

function TablePaginationActions(props) {

  const theme = useTheme();
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};







const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});




export const TablaVoluntarios2 = (props) => {

    const classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };    

    function handleDeletion(id){
        swal({
            title: "¡¡ Cuidado !!",
            text: "No se recomienda en lo absoluto este tipo de acciones. Si continúa, estará eliminando datos muy valiosos... Se recomienda simplemente rechazar al postulante",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            props.deleteVolunteer(Number(id))
            console.log(id);
              swal("El registro fue destruido con éxito", {
                icon: "success",
              });
            } else {
              swal("El registro fue conservado");
            }
          });
    
    }

    function handleStatusChange(volunteer){
      swal({
        title: `Estás por dar de alta a ${volunteer.firstName} ${volunteer.lastName} como voluntario.`,
        text: "¿Está seguro? Si confirma esta acción, el voluntario se convertirá en asesor.",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((confirm) => {
        if (confirm) {
        props.acceptVolunteer(volunteer)
          swal("El usuario se convirtió en asesor.", {
            icon: "success",
          });
        } else {
          swal("El Voluntario no ha sido dado de alta");
        }
      });
      
  }


    // Me traigo los Voluntarios de la DB y sincronizo al Redux
        useEffect(()=>{
            props.getVolunteers();
        },[])



    return (
        <TableContainer component={Paper} style={{marginLeft:230, marginTop: 40, width:`calc(100% - ${250}px)`}}>
         { props.volunteers.length ? 
              <Table className={classes.table} aria-label="custom pagination table">
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

                    {(rowsPerPage > 0
                          ?  props.volunteers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                           : props.volunteers
                        ).map((voluntario) => (
                          <TableRow key={voluntario.firstName}>
                            <TableCell component="th" scope="voluntario">
                              {voluntario.firstName}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="right">
                              {voluntario.lastName}
                            </TableCell>
                            <TableCell style={{ width: 100 }} align="right">
                              {voluntario.email}
                            </TableCell>
                            <TableCell style={{ width: 300 }} align="right">
                              {moment(voluntario.createdAt).format('LLL')+'hs'}
                            </TableCell>
                            <TableCell align="right">
                                        {
                                        <ButtonGroup variant="contained"  aria-label="contained primary button group" key={`detalles${voluntario.id}`}>
                                                   <Button style={{ background:"#8CC63E",color:'green'}} key={`aceptar${voluntario.id}`} name={voluntario.id}  onClick={() => handleStatusChange(voluntario)}>
                                                                <CheckCircleIcon/>  
                                                    </Button>
                                                    <Link color ="primary" to={`/admin/voluntarios/${voluntario.id}`} key={`detalles${voluntario.id}`} className="btn btn-primary" type="button">
                                                             <FaceIcon/> Detalles
                                                    </Link>
                                                    <Button color="secondary" key={`rechazar${voluntario.id}`} name={voluntario.id} onClick={() => handleDeletion(voluntario.id)}>
                                                                <DeleteForeverIcon/> Eliminar   
                                                    </Button>
                                                   
                                        </ButtonGroup>
                                        }
                                        </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={6}
                      count={props.volunteers.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
                </Table>:'No hay voluntarios en este momento'}
     
      </TableContainer>
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
