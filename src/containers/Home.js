import React, {Component} from 'react';
// We need some glue between react and ReduxStudents
// This component/container needs to know about Redux state.
// The answer? The connect method from the react-redux module. The glue
import { connect } from 'react-redux';

class Home extends Component{
	render(){
		console.log(this.props.students)
		var studentArray = [];
		this.props.students.map((student,index)=>{
			studentArray.push(<li key={index}>{student}</li>)
		})
		return(
			<div>
				<h1>Sanity Check</h1>
			</div>
		)
	}
}

// All containers that need access to state will have this function
// We are creating a mapping between redux state and this component's Props
function mapStateToProps(state){
	// mapStateToProps returns an object with each piece of state we need
	return{
		// From our master Reducer, we have a "state" object (React and Redux are DIFFERENT states)
		// Inside of that state object, we have a property: students
		// This exists because we made it a property in the rootReducer
		students: state.students
	}

}

// INSTEAD OF exporting the class(component), we export CONNECT
export default connect(mapStateToProps)(Home);