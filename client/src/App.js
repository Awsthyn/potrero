import React from "react";
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
import DetalleHorariosVoluntario from './components/admin/DetalleHorariosVoluntario';
import AdminRoute from "./AdminRoute.js";
import StudentCard from "./components/student/StudentCard/StudentCard";
import AsesorProfile from "./components/AsesorProfile/AsesorProfile";
import ClassAssignation from "./components/student/classes/ClassAssignation";
import SubjectsPerStudent from "./components/student/classes/SubjectsPerStudent";
import GeneralAssistsDetail from "./components/stats/printDetail/GeneralAssistsDetail.jsx";
import DetailsOfInassistances from "./components/stats/DetailsOfInassistances";

class App extends React.Component {
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
            "/admin/detail",
            "/admin/estudiantes/listadematerias/:studentId",
            "/admin/estudiantes/asignacion/:studentId/:subjectId"
          ]}
          component={AdminNavBar}
        />
        <Route exact path="/" component={Home} />
        <Route path="/voluntarios" component={ContenedorForm} />
        {/* <Route path="/admin" component={AdminDrawer} /> */}
        <AdminRoute exact path="/admin" component={AdminDrawer} />
        <Route exact path="/admin" component={AdminPanel} />
        <Route exact path="/admin/voluntarios" component={TablaVoluntarios} />
        <Route
          exact
          path="/admin/voluntarios/:id"
          render={({ match }) => <DetalleVoluntario id={match.params.id} />}
        />
        <Route
          exact
          path='/admin/voluntarios/detalleHorarios/:id'
          render={({ match }) => <DetalleHorariosVoluntario id={match.params.id} />}
        />
        <Route exact path='/admin/usuarios' component={TablaUsuarios} />
        <Route exact path='/admin/materias' component={TablaMaterias} />
        <Route exact path='/admin/estudiantes' component={StudentCrud} />
        <Route
          exact
          path="/admin/estudiantes/agregar"
          component={CreateStudentForm}
        />
        <Route
          exact
          path="/admin/estudiantes/detalles/:id"
          render={(props) => (
            <StudentFile student={props.location.state.props} />
          )}
        />
        <Route
          exact
          path="/admin/estudiantes/asignacion/:studentId/:subjectId"
          component={ClassAssignation}
        />
        <Route
          exact
          path="/admin/estudiantes/listadematerias/:studentId"
          component={SubjectsPerStudent}
        />

        <Route exact path="/usuario/login" component={Login} />
        <Route exact path="/usuario/perfil" component={MiPerfil} />
        <Route exact path="/usuario/recuperar" component={PasswordRecovery} />

        <Route exact path="/login/:token" component={ResetPassword} />

        <Route path="/studentCard" component={StudentCard} />

        <Route path="/asesor/test" component={AsesorProfile} />
        <Route
          exact
          path="/admin/inassistances"
          component={DetailsOfInassistances}
        />
        <Route path="/admin/detail" component={GeneralAssistsDetail} />
      </div>
    );
  }
}

export default App;
