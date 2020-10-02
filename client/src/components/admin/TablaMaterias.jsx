
import React, {useState,useEffect} from 'react'
import { forwardRef } from 'react';
import { connect } from "react-redux";
import {useHistory,Link} from 'react-router-dom';

/////////////////////////////////////////////////

// Estilos
import {makeStyles} from '@material-ui/styles';
import { createMuiTheme} from '@material-ui/core/styles';

//Actions
import { getSubjects,deleteSubject,postSubject,putSubject} from "../../redux/actions/subject"


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
import EditIcon from '@material-ui/icons/Edit';
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

const TablaMaterias = (props) => {
    const history = useHistory();
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [locked,setLocked] = useState(true)

    useEffect(()=>{

       props.getSubjects()
            .then((subjects)=>{
                if(!subjects) {
                    Swal.fire(
                        'Conectar la BD',
                        `Debes conectar la Base de Datos o agregar usuarios`,
                        'warning'
                        )
                        history.push(`/admin`)    
                        return 
                    }
             setData( subjects && subjects.map(subject => ({
               
                 id: subject.id,
                nombre: subject.name, 
                nivel:Math.floor(subject.academicLevels[0].numericLevel/100)===1 ? 'Primario': 'Secundario' ,
                grados:subject.academicLevels.length+' '+ 'Grados',
             })
             )
             )
        
                    }
            )
      

    },[getSubjects])


          async function handleRename(subject){
            const { value: rename } = await Swal.fire({
              title: 'Ingresa el nombre nuevo',
              input: 'text',
              inputPlaceholder: `Por ejemplo: ${subject.nombre}002`
            })
            
            if (rename) {
              Swal.fire(`Se reemplazará el nombre de ${subject.nombre} por  ${rename}`)
              props.putSubject({id: subject.id, name:rename})
              .then(info=>setData( data.map(datas=>
                datas.id == info.id ? {...datas,nombre:info.name}:datas)))

            }
         
        }

            return (
            <div style={{marginTop:100}}>
                {data && data.length ? 
                <MaterialTable
                icons={tableIcons}
                title="Tabla de Materias"
                components={{
                    Toolbar: props => (
                        <div style={{backgroundColor: '#e8eaf5'}}>
                            <MTableToolbar {...props} />
                            <Button 
                              style={{margin:10}}
                              variant="contained"  
                              color= "primary"
                               onClick={()=>history.push('/admin/materias/agregar')}>
                            <PostAddIcon/>
                        </Button>
                      </div>
                      ),
                  }}
                columns={[
                    { title: 'Nombre de la Materia', field: 'nombre' },
                    { title: 'Nivel', field: 'nivel' },
                    {title: 'Dictándose en', field:'grados'},
                ]}
                data={data}
                actions={[
                      {
                    icon: () => <EditIcon color="primary" />,
                    tooltip: 'Renombrar Materia',
                    onClick: (event, rowData) => 
                    Swal.fire({
                        title:  `¿Deseas renombrar esta materia?`,
                        icon: "question",
                        confirmButtonColor: VIOLETA,
                        showCancelButton: true,
                        cancelButtonColor: 'gray',
                       })
                        .then((result) => {
                                 if (result.isConfirmed) {
                                      handleRename(rowData)
                                 }
                                })
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
    function mapStateToProps(state) {
        return {
            subjects:state.subjects.subjects,
        };
      }
    
      function mapDispatchToProps(dispatch) {
        return {
            getSubjects:() => dispatch(getSubjects()),
            deleteSubject:(subjectId) => dispatch(deleteSubject(subjectId)),
            postSubject: (subject) => dispatch(postSubject(subject)),
            putSubject: subject => dispatch(putSubject(subject))
        };
      }
      export default connect(mapStateToProps, mapDispatchToProps)(TablaMaterias);