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
import {useHistory} from 'react-router-dom'


//Material-UI Components
import AccountCircle from '@material-ui/icons/AccountCircle';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FaceIcon from '@material-ui/icons/Face';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';


const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

moment.locale('es');

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: 20,
  },
  margin: {
    margin: 20,
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







// table { border-collapse: separate; }
// td { border: solid 1px #000; }
// tr:first-child td:first-child { border-top-left-radius: 10px; }
// tr:first-child td:last-child { border-top-right-radius: 10px; }
// tr:last-child td:first-child { border-bottom-left-radius: 10px; }
// tr:last-child td:last-child { border-bottom-right-radius: 10px; }

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    borderCollapse:'separate',
    borderSpacing:'0px 10px',
  },
  root: {
    marginTop: 100,
    justifyContent:'center'
  },
 form:{
  //  margin: 30,
 },
 filterpanel:{
   padding:20,
   display:'flex',
   justifyContent:'center',
   width: 'fit-content',
   elevation:10,
   alignItems:'center',
   margin:'auto'
 }
});




const TablaVoluntarios = (props) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filtered,setFiltered] = useState([]);
    const [inputSearch,setInputSearch] = useState('');
    const history = useHistory();
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
            text: "Si continúa, estará inhabilitando la solicitud... La información seguirá disponible en la sección rechazados",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            props.deleteVolunteer(Number(id)).then(()=>{
              setFiltered(filtered.filter(vol=>vol.id !== id))
            })
              swal("El postulante fue rechazado", {
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
        text: "¿Está seguro? Si confirma esta acción, se convertirá al postulante voluntario en miembro asesor.",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((confirm) => {
        if (confirm) {
        props.acceptVolunteer(volunteer)
        .then(()=>{
          props.getVolunteers()
          .then((pendientes)=>{
             setFiltered(pendientes);
            })
        })
          swal(`Se ha dado de alta a: ${volunteer.firstName} con éxito`, {
            icon: "success",
          });
        } else {
          swal("El Voluntario no ha sido dado de alta");
        }
      });
      
  }


    // Me traigo los Voluntarios de la DB y sincronizo al Redux
        useEffect(()=>{
            props.getVolunteers()
            .then((pendientes)=>{
               setFiltered(pendientes);
              })
        },[])

      
    function handleFilter(e){
      switch (e){
        case 'LIN':
          setFiltered(props.volunteers.filter(voluntario => voluntario.linkedin !== null));
          break;
        case 'CV':
          setFiltered(props.volunteers.filter(voluntario => voluntario.cv !== null));
          break;
        case 'TODOS':
          setFiltered(props.volunteers)
          break;
          case 'NOMBRE':
          setFiltered(props.volunteers.filter(voluntario => voluntario.firstName.toLowerCase().includes(inputSearch.toLowerCase() ) || voluntario.lastName.toLowerCase().includes(inputSearch.toLowerCase()) ))
          break;
     } 
    }


    return (
      <div  className={classes.root}>

                  <Paper className={classes.filterpanel}>
                                    <ButtonGroup variant="contained" alignItems="center"  aria-label="contained button group">
                                                   <Button disableRipple  name="TODOS" key="TODOS" style={{ background:"lightgreen",color:'white'}} onClick={()=>handleFilter('TODOS')}>
                                                   <CheckCircleOutlineIcon/> Todos 
                                                    </Button>
                                                    <Button disableRipple  name="CV"  key="CV" style={{ background:"lightblue",color:'white'}} onClick={()=>handleFilter('CV')}>
                                                    <CheckCircleOutlineIcon/> CV   
                                                    </Button>
                                                    <Button disableRipple  name="LINKEDIN"  key="LINKEDIN" style={{ background:"pink",color:'white'}} onClick={()=>handleFilter('LIN')}>
                                                    <CheckCircleOutlineIcon/> Linkedin   
                                                    </Button>
                                        </ButtonGroup>

                                           <form className={classes.form} onSubmit={e=>{e.preventDefault()}}>

                                              <ButtonGroup style={{ marginLeft:50}} variant="contained"  aria-label="contained button group">
                                                    <div className={classes.margin}>
                                                      <Grid container spacing={1} alignItems="center">
                                                        <Grid item>
                                                          <AccountCircle />
                                                        </Grid>
                                                 
                                                        <Grid item>
                                                          <TextField id="input-with-icon-grid" label="Buscar Nombre o Apellido" value={inputSearch} onChange={(e)=>setInputSearch(e.target.value)} />
                                                        </Grid>
                                                      </Grid>
                                                    </div>
                                                    <Button type="submit" name="NOMBRE"  key="NOMBRE" style={{ background:VIOLETA,color:'white'}} onClick={()=>
                                                      {
                                                      handleFilter('NOMBRE');
                                                      setInputSearch('');
                                                      }}>
                                                          <SearchIcon />
                                                    </Button>
                                                  
                                              </ButtonGroup>
                                            </form>
                      </Paper>
      
        <TableContainer component={Paper} style={{margin:50, width:`calc(100% - ${100}px)`}}>
         { filtered ? 
              <Table style={{
                minWidth: 500,
                borderCollapse:'separate',
                borderSpacing:'0px 10px',
              }} className={classes.table} aria-label="custom pagination table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Fecha de postulación</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                    {(rowsPerPage > 0
                          ?  filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                           : filtered
                        ).map((voluntario) => (
                          <TableRow  key={voluntario.id} style={{borderRadius:10}}>
                            <TableCell  component="th" scope="voluntario">
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
                                        <ButtonGroup variant="contained"  aria-label="contained button group" key={`detalles${voluntario.id}`}>
                                                   
                                                   <Button style={{ textTransform: 'none',background:"lightgreen",color:'white',}} key={`aceptar${voluntario.id}`}  onClick={() => handleStatusChange(voluntario)}>
                                                                <CheckCircleIcon/> Aprobar 
                                                    </Button>
                                                    <Button  style={{textTransform: 'none', background:"lightblue",color:'white'}} key={`detalles${voluntario.id}`}  onClick={() => history.push(`/admin/voluntarios/${voluntario.id}`)}>
                                                            <FaceIcon/> Detalles   
                                                    </Button>
                                                   
                                                    <Button style={{textTransform: 'none', background:"pink",color:'white'}}  key={`rechazar${voluntario.id}`}  onClick={() => handleDeletion(voluntario.id)}>
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
                      count={filtered.length}
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
export default connect(mapStateToProps, mapDispatchToProps)(TablaVoluntarios)
