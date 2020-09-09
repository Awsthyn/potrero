import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import VolunteerForm from './components/volunteerForm/volunteerForm';

function App() {
	return (
		<div className="App">
			<Route path="/voluntarios" component={VolunteerForm} />
		</div>
	);
}

export default App;
