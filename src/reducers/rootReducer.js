// This is our master reducer... the ROOT reducer
// The reducers hold pieces of state. The root reducer holds ALL reducers
// i.e., the rootReducer holds ALL pieces of state, or applicaiton state.

// We need to get the combineReducers method from redux, to make a rootReducer that Provider can use
import { combineReducers } from 'redux';

// Import each reducer here.
// First: import the StudentReducer
// import StudentReducer from './StudentReducer';

// import the register reducer which contains {ms}
import RegisterReducer from './RegisterReducer';

// create a rootReducer using the combineReducer method, so we can export it to the Store in index.js
const rootReducer = combineReducers({
	// Inside here, we pass each reducer as a key/value
	// Each key will be available as a piece of state later
	registerReducer: RegisterReducer
})

export default rootReducer;