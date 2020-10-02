import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

/////////////////////////////////////////////////

// Estilos
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

//Actions
import { getUsers, banUser } from '../../redux/actions/users';
import { getStudents, putStudentIsActive } from '../../redux/actions/student';
import { getSubjects } from '../../redux/actions/subject';

// Sweet Alerts
import swal from 'sweetalert';
import Swal from 'sweetalert2';

// Moment
import moment from 'moment';
import 'moment/locale/es';

//Material-Table
import MaterialTable, { MTableToolbar } from 'material-table';

//Componentes
import Button from '@material-ui/core/Button';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const VIOLETA = '#492BC4';
const VERDE = '#8CC63E';
const NEGRO = '#333333';

moment.locale('es');

export const StudentCrud = ({
  getStudents,
  getSubjects,
  putStudentIsActive,
  students,
}) => {
  const history = useHistory();
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    getSubjects();
    getStudents().then((students) => {
      if (!students) {
        Swal.fire(
          'Conectar la BD',
          `Debes conectar la Base de Datos o agregar usuarios`,
          'warning'
        );
        history.push(`/admin`);
        return;
      }
      setData(
        students
          .map((student) => ({
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            tutorEmail: student.tutorEmail,
            tutorFirstName: student.tutorFirstName,
            tutorPhone: student.tutorPhone,
            imageUrl: `https://api.adorable.io/avatars/285/${student.firstName}@adorable.png`,
            nivel: 'Building',
            grado: 'Building',
          }))
      );
    });
  }, [getStudents, getSubjects]);

  return (
    <div style={{ marginTop: 100 }}>
      {data && data.length ? (
        <MaterialTable
          icons={tableIcons}
          title='Tabla de Estudiantes Activos'
          components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: '#e8eaf5' }}>
                <MTableToolbar {...props} />
                <div style={{ textAlign: 'center', fontFamily: 'Poppins' }}>
                  <Button
                    style={{ margin: 10 }}
                    variant='contained'
                    color={locked ? 'secondary' : 'primary'}
                    onClick={() => setLocked(!locked)}
                  >
                    {locked ? <LockIcon /> : <LockOpenIcon />}
                  </Button>
                  <Button
                    style={{ margin: 10 }}
                    variant='contained'
                    color='primary'
                    onClick={() => history.push('/admin/estudiantes/agregar')}
                  >
                    <PersonAddIcon />
                  </Button>
                </div>
              </div>
            ),
          }}
          columns={[
            {
              title: 'Avatar',
              field: 'imageUrl',
              render: (rowData) => (
                <img
                  src={rowData.imageUrl}
                  style={{ width: 40, borderRadius: '50%' }}
                />
              ),
            },
            { title: 'Nombre', field: 'firstName' },
            { title: 'Apellido', field: 'lastName' },
            { title: 'Contacto Tutor', field: 'tutorEmail' },
            { title: 'Nivel máximo', field: 'nivel' },
            { title: 'Grado máximo', field: 'grado' },
          ]}
          data={data}
          actions={[
            {
              icon: () => <SupervisedUserCircleIcon color='primary' />,
              tooltip: 'Asignar Tutorías',
              onClick: (event, rowData) =>
                Swal.fire({
                  title: `¿Deseas Asignar Tutorías a ${rowData.firstName} ${rowData.lastName}?`,
                  icon: 'question',
                  confirmButtonColor: VIOLETA,
                  showCancelButton: true,
                  cancelButtonColor: 'gray',
                }).then((result) => {
                  if (result.isConfirmed) {
                    history.push(`/admin/estudiantes/asignacion/${rowData.id}`);
                  }
                }),
            },
            {
              icon: () => <ListAltIcon />,
              tooltip: 'Detalle del Alumno',
              onClick: (event, rowData) =>
                Swal.fire({
                  title: `¿Deseas visitar el detalle de ${rowData.firstName} ${rowData.lastName}?`,
                  icon: 'question',
                  confirmButtonColor: VIOLETA,
                  showCancelButton: true,
                  cancelButtonColor: 'gray',
                }).then((result) => {
                  if (result.isConfirmed) {
                    history.push(`/admin/estudiantes/detalles/${rowData.id}`);
                  }
                }),
            },

            (rowData) => ({
              icon: () => <BlockIcon color='secondary' />,
              disabled: locked,
              tooltip: 'Inhabilitar Alumno',
              onClick: (event, rowData) =>
                Swal.fire({
                  title: `Inhabilitar a ${rowData.firstName} ${rowData.lastName}`,
                  text: `Confirmando esta acción, se le denegará el acceso a la plataforma pero
                        se conservarán los datos relacionados a su trayecto en el Potrero.`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: VERDE,
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Inhabilitar',
                  showLoaderOnConfirm: true,
                  preConfirm: () => {
                    return;
                    // props. // inhabilitar StudentAction
                    // .then(response => {

                    //     if (response.statusText !=='OK') {
                    //       throw new Error('No se pudo')
                    //     }
                    //     setData(data.filter(activos =>activos.id!==rowData.id))
                    //     return response.data
                    // })
                  },
                  allowOutsideClick: () => !Swal.isLoading(),
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      'Listo',
                      `La operación fue resuelta con éxito.`,
                      'success'
                    );
                  }
                }),
            }),
          ]}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            headerStyle: {
              position: 'sticky',
              color: VIOLETA,
            },
            search: true,
            exportButton: true,
            actionsColumnIndex: -1,
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? '#9ba6e2' : '#FFF',
            }),
            headerStyle: {
              backgroundColor: VIOLETA,
              color: 'white',
              '&:hover': {
                color: 'white',
                textDecoration: 'none',
              },
            },
          }}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students.students,
  sessionUser: state.sessions.sessionUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getStudents: () => dispatch(getStudents()),
    getSubjects: () => dispatch(getSubjects()),
    putStudentIsActive: (student) => dispatch(putStudentIsActive(student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCrud);