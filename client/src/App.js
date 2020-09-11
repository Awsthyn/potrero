import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import VolunteerForm from './components/VoluntarioForm';
import Login from './components/Login';
import MiPerfil from './components/MiPerfil';



function App() {
	return (
		<div className="App">
			<Route path="/voluntarios/formulario" component={VolunteerForm} />
			<Route exact path="/usuario/login" component={Login} />
			<Route exact path="/usuario/perfil" component={MiPerfil} />
		</div>
	);
}

export default App;
