
import React, {useState,useEffect} from 'react'
import { forwardRef } from 'react';
import { connect } from "react-redux";
import {useHistory,Link} from 'react-router-dom';

/////////////////////////////////////////////////

// Estilos
import {makeStyles} from '@material-ui/styles';
import { createMuiTheme} from '@material-ui/core/styles';

//Actions
import { getClasses} from "../../redux/actions/classes";

// Sweet Alerts
import swal from 'sweetalert';
import Swal from 'sweetalert2';


// Moment
import moment from 'moment';
import 'moment/locale/es';

//Material-Table
import MaterialTable, { MTableToolbar } from 'material-table';

//Componentes 
import Button from '@material-ui/core/Button'
import Spinner from '../potrero-spinner/Spinner.jsx';


// Iconos
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BlockIcon from '@material-ui/icons/Block';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const VIOLETA = '#492BC4'
const VERDE = '#8CC63E'
const NEGRO = '#333333'

moment.locale('es');






export const StudentCrud = ({ getClasses }) => {
  const history = useHistory()
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);


  function parseTime(string){
    console.log(string)
    if(string.includes('.')){
    const arr = string.split('.');
    return (arr[0]+':'+'30'+'hs');
  }
    else return string+':'+'00'+'hs'
  }
  

  useEffect(() => {
      

    getClasses().then((classes)=>{
        console.log(classes)
        if(!classes) {
            Swal.fire(
                'Conectar la BD',
                `Debes conectar la Base de Datos o agregar usuarios`,
                'warning'
                )
                history.push(`/admin`)    
                return 
            }
      setData( classes.map(classes => ({  
        id:classes.id,
        idAsesor:classes.user.id, 
        alumno: `${classes.student.firstName} ${classes.student.lastName}` ,
        asesor: `${classes.user.firstName} ${classes.user.lastName}`,
        materia: classes.subject.name,
        hora:parseTime(classes.duration[0].value), 
        duracion:parseTime((Number(classes.duration[1].value)-Number(classes.duration[0].value)).toString()), 
        dia:classes.nameWeekDay, 
     
      }) ))

    }
    )
}, [getClasses])

return (
    <div style={{marginTop:100}}>
        {data && data.length ? 
        <MaterialTable
        icons={tableIcons}
        title="Tabla de Clases Actuales"
        components={{
            Toolbar: props => (
                <div style={{backgroundColor: '#e8eaf5'}}>
                    <MTableToolbar {...props} />
                        <div style={{  textAlign: "center",fontFamily:'Poppins' }}>
                        <Button 
                           style={{margin:10}}
                            variant="contained"  
                            color= "primary"
                            onClick={()=>history.push('/')}>
                            <PostAddIcon/>
                        </Button>
                     </div>
              </div>
              ),
          }}
        columns={[
          { title: 'Alumno', field: 'alumno' },
            { title: 'Asesor', field: 'asesor' },
            { title: 'Materia', field: 'materia' },
            { title: 'Dia', field:'dia'},
            { title: 'Hora Inicio', field: 'hora'},
            { title: 'Duración', field: 'duracion'},

        ]}
        data={data}
        actions={[
            {
            icon: () => <ListAltIcon color="primary"/>,
            tooltip: 'Detalle de Clase',
            onClick: (event, rowData) => history.push(`/admin/class/${rowData.id}`)            
            },
            {
              icon: () => <SupervisedUserCircleIcon color="primary" />,
              tooltip: 'Detalle de Asesor',
              onClick: (event, rowData) => history.push(`/asesores/${rowData.idAsesor}`)            
              },
            
        ]}
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{  
            headerStyle: { 
                position: 'sticky',
                color: VIOLETA
            },
            search: true,
            exportButton: true,
            actionsColumnIndex: -1,
            rowStyle: rowData => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#9ba6e2' : '#FFF',
              }),
              headerStyle: {
                backgroundColor: VIOLETA,
                color: 'white',
                '&:hover': {
                    color:'white',
                    textDecoration:'none',
                 },
              }
        }}
       
         
        />  : <Spinner/>}
  </div>
    )



  
}

const mapStateToProps = (state) => ({
  students: state.classes.classes,
})

const mapDispatchToProps = dispatch => {
  return {
    getClasses: () => dispatch(getClasses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCrud);
