import {FETCH_TODOS,FETCH_TODOS_COMMIT,
	CREATE_TODO,CREATE_TODO_COMMIT,ROLLBACK_CREATE_TODO,
	REMOVE_TODO,REMOVE_TODO_COMMIT,ROLLBACK_REMOVE_TODO,
	UPDATE_TODO,UPDATE_TODO_COMMIT,ROLLBACK_UPDATE_TODO} from './actions';


const INTIAL_STATE = {todos : []};


const deleteTodo = (id,state) => {
	return Object.assign({},state,{todos : state.todos.filter((todo) => todo._id != id)});
};

const createTodo = (_id,todo,state) => {
	return Object.assign({},state,{todos : state.todos.concat({_id,todo})});
};

const updateTodo = (id,updateObj,state) => {
	return Object.assign({},state,{todos : state.todos.map((todo) => {  if(todo._id == id) return Object.assign({},todo,updateObj);  else return todo; })});
};


const todoReducer = (state=INTIAL_STATE,action) => {

switch(action.type){

		case FETCH_TODOS : 
			return Object.assign({},state,{todos : action.todos});
		case FETCH_TODOS_COMMIT : 
			return Object.assign({},state,{todos : action.payload.todos});

		case CREATE_TODO :
			return createTodo( action.payload.id,action.payload.todo,state);
		case CREATE_TODO_COMMIT : 
			return updateTodo(action.meta.id,{_id : action.payload.id},state);
	 	case ROLLBACK_CREATE_TODO :
	 		return deleteTodo(action.meta.id,state);

	 	case REMOVE_TODO:
	 		return deleteTodo(action.payload.id,state);
	 	case REMOVE_TODO_COMMIT : 
			return state;
		case ROLLBACK_REMOVE_TODO : 
			return createTodo(action.meta.id,action.meta.todo,state);

		case UPDATE_TODO:
		    return updateTodo(action.payload.id,{todo : action.payload.todo},state);
		case UPDATE_TODO_COMMIT : 
			return state;
		case ROLLBACK_UPDATE_TODO : 
			return state;

		default :
			return state;
	}

};

export default todoReducer;