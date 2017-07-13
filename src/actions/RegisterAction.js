import $ from 'jquery';

export default function(userData){
	var thePromise = $.ajax({
		method: "POST",
		url: window.hostAddress + '/register',
		data: userData
	})
	return{
		// MUST RETURN A TYPE
		type: "REGISTER",
		payload: thePromise
	}
}