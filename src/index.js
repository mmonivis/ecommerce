import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './containers/Home';

import App from './App';

// Go get the createStore method from the redux module
import { createStore } from 'redux';

// import the Provider from react-redux so react and redux can talk
import { Provider } from 'react-redux';

// import the rootReducer so we can give it to the store. Fill those shelves!
import reducers from './reducers/rootReducer';

const theStore = createStore(reducers);

// ReactDOM.render takes 2 args: 1. What, 2. Where
ReactDOM.render(
	<Provider store={theStore}>
		<App />
	</Provider>,
	document.getElementById('root')
);
