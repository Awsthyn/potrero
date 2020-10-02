import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route } from "react-router-dom";
import ContenedorForm from "./components/formularioVoluntario/ContenedorForm";
import Login from "./components/Login";
import MiPerfil from "./components/MiPerfil";
import Home from "./components/Home";
import AdminPanel from "./components/admin/AdminPanel";
import TablaUsuarios from "./components/admin/TablaUsuarios";
import TablaVoluntarios from "./components/admin/TablaVoluntarios";
import StudentCrud from "./components/student/StudentCrud";
import CreateStudentForm from "./components/student/CreateStudentForm";
import StudentFile from "./components/student/StudentFile";
import ResetPassword from "./components/formularioVoluntario/PasswordForgot";
import TablaMaterias from "./components/admin/TablaMaterias";
import AdminNavBar from "./components/admin/AdminNavBar";
import AdminDrawer from "./components/admin/AdminDrawer";
import PasswordRecovery from "./components/PasswordRecovery";
import DetalleVoluntario from "./components/admin/DetalleVoluntario";
import DetalleHorariosVoluntario from "./components/admin/DetalleHorariosVoluntario";
import AdminRoute from "./AdminRoute.js";
import StudentCard from "./components/student/StudentCard/StudentCard";
import AsesorProfile from "./components/AsesorProfile/AsesorProfile";
import ClassAssignation from "./components/student/classes/ClassAssignation";
import SubjectsPerStudent from "./components/student/classes/SubjectsPerStudent";
import GeneralAssistsDetail from "./components/stats/printDetail/AssistsDetail.jsx";
import DetailsOfInassistances from "./components/stats/DetailsOfInassistances";
import DetalleClase from "./components/admin/detalleClase/DetalleClase";
import DetalleAsesores from "./components/stats/printDetail/DetalleAsesores.jsx";
import AdvisorFormMail from "./components/admin/AdvisorFormMail";
import OfWithDemDetail from "./components/stats/printDetail/OfWithDemDetail";
import TablaClases from "./components/admin/TablaClases";
import { getCurrentUser } from "./redux/actions/session";
import DetailQualification from "./components/stats/printDetail/DetailQualification";

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    return (
      <div className="App">
        {/* PARA RENDERIZAR NAVBAR EN TODOS LOS COMPONENTES, EXCEPTO EN LOGIN. AGREGAR RUTAS AQUÍ.  */}
        <Route
          path={[
            "/admin/voluntarios",
            "/admin/voluntarios/:id",
            "/admin/usuarios",
            "/admin/materias",
            "/admin/estudiantes",
            "/admin/estudiantes/agregar",
            "/admin/estudiantes/detalles/:id",
            "/admin/detalle/asistencia",
            "/admin/detalle/asesores",
            "/admin/estudiantes/listadematerias/:studentId",
            "/admin/estudiantes/asignacion/:studentId/:subjectId",
            "/admin/clases",
            "/admin/class/:id",
            "/admin/detalle/materias",
            "/admin/detalle/calificacion",
          ]}
          component={AdminNavBar}
        />
         
        <Route exact path="/" component={Home} />
        <Route exact path="/voluntarios" component={ContenedorForm} />
        {/* <Route path="/admin" component={AdminDrawer} /> */}
        <AdminRoute exact path="/admin" component={AdminDrawer} />
        <Route exact path="/admin" component={AdminPanel} />
        <Route exact path="/admin/voluntarios" component={TablaVoluntarios} />
        <Route exact path="/admin/clases" component={TablaClases} />

        <Route
          exact
          path="/admin/voluntarios/:id"
          render={({ match }) => <DetalleVoluntario id={match.params.id} />}
        />
        <Route
          exact
          path="/admin/voluntarios/detalleHorarios/:id"
          render={({ match }) => (
            <DetalleHorariosVoluntario id={match.params.id} />
          )}
        />
        <Route exact path="/admin/usuarios" component={TablaUsuarios} />
        <Route exact path="/admin/materias" component={TablaMaterias} />
        <Route exact path="/admin/estudiantes" component={StudentCrud} />
        <Route
          exact
          path="/admin/estudiantes/agregar"
          component={CreateStudentForm}
        />
        {/* <Route
          exact
          path="/admin/estudiantes/detalles/:id"
          component={StudentFile}
        /> */}
        <Route
          exact
          path="/admin/estudiantes/asignacion/:studentId/:subjectId"
          component={ClassAssignation}
        />
        <Route
          exact
          path="/admin/estudiantes/asignacion/:studentId"
          component={SubjectsPerStudent}
        />
        <Route
          exact
          path="/admin/estudiantes/detalles/:id"
          render={({ match }) => (
            <StudentFile id={match.params.id} />
          )}
        />
        <Route exact path='/admin/estudiantes/asignacion/:id' component={ClassAssignation} />
        <Route exact path='/admin/estudiantes/listadematerias/:id' component={SubjectsPerStudent} />

        <Route exact path="/usuario/login" component={Login} />
        <Route exact path="/usuario/perfil" component={MiPerfil} />
        <Route exact path="/usuario/recuperar" component={PasswordRecovery} />
        <Route exact path="/login/:token" component={ResetPassword} />

        <Route path="/studentCard" component={StudentCard} />

        <Route exact path="/asesores/:id" component={AsesorProfile} />
        <Route
          exact
          path="/admin/inassistances"
          component={DetailsOfInassistances}
        />
        <Route
          exact
          path="/admin/detalle/asistencia"
          component={GeneralAssistsDetail}
        />
        <Route
          exact
          path="/admin/detalle/materias"
          component={OfWithDemDetail}
        />
        <Route
          exact
          path="/admin/detalle/calificacion"
          component={DetailQualification}
        />
        <Route path="/admin/class/:classId" component={DetalleClase} />
        <Route
          exact
          path="/admin/detalle/asesores"
          component={DetalleAsesores}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.sessions.sessionUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
