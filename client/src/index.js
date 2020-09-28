import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';
import  {MuiPickersUtilsProvider}  from "@material-ui/pickers/";
import MomentUtils from '@date-io/moment';

ReactDOM.render(
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={MomentUtils} >
		<BrowserRouter>
			<App />
		</BrowserRouter>
		</MuiPickersUtilsProvider>
	</Provider>,
	document.getElementById('root'),
);
