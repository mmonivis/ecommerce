
export default function(state = [], action){
	if(action.type == "UPDATE_CART"){
		return action.payload;
	}else{
		return state;
	}
}