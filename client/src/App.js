import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import ContenedorForm from './components/formularioVoluntario/ContenedorForm';
import Login from './components/Login';
import MiPerfil from './components/MiPerfil';
import Home from './components/Home';
import NavBar from './components/NavBar';
import AdminPanel from './components/admin/AdminPanel';
import TablaUsuarios from './components/admin/TablaUsuarios';
import TablaVoluntarios from './components/admin/TablaVoluntarios';
import StudentCrud from './components/student/StudentCrud';
import CreateStudentForm from './components/student/CreateStudentForm';
import StudentFile from './components/student/StudentFile';

function App() {
	return (
		<div className="App">
			<Route path="/" component={NavBar} />
			<Route exact path="/" component={Home} />
			<Route path="/voluntarios" component={ContenedorForm} />
			<Route exact path="/admin" component={AdminPanel} />
			<Route exact path="/admin/voluntarios" component={TablaVoluntarios} />
			<Route exact path="/admin/usuarios" component={TablaUsuarios} />
			<Route exact path="/admin/materias" component={TablaVoluntarios} />
			<Route exact path="/usuario/login" component={Login} />
			<Route exact path="/usuario/perfil" component={MiPerfil} />
			<Route exact path="/admin/student" component={StudentCrud} />
			<Route exact path="/admin/student/post" component={CreateStudentForm} />
			<Route exact path="/admin/student/details/:id" component={StudentFile} />
		</div>
	);
}

export default App;
