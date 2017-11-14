import {v4} from 'node-uuid';

export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_COMMIT = 'FETCH_TODOS_COMMIT';

export const CREATE_TODO = 'CREATE_TODO';
export const CREATE_TODO_COMMIT = 'CREATE_TODO_COMMIT';
export const ROLLBACK_CREATE_TODO = 'ROLLBACK_CREATE_TODO';

export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_TODO_COMMIT = 'REMOVE_TODO_COMMIT';
export const ROLLBACK_REMOVE_TODO = 'ROLLBACK_REMOVE_TODO';

export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_TODO_COMMIT = 'UPDATE_TODO_COMMIT';
export const ROLLBACK_UPDATE_TODO = 'ROLLBACK_UPDATE_TODO';

export const fetchTodos = () => {
	return {
		type : FETCH_TODOS,
		todos : [],
		meta: {
    		offline: {
		      // the network action to execute:
		     effect: { url: '/api/todos', method: 'GET' },
		     commit: {  type: FETCH_TODOS_COMMIT }
		  	}
  		}

	};
};

export const createTodo = (todo) => {
	const id = v4();

	return {
		type : CREATE_TODO,
		payload : {id,todo},
		meta: {
    		offline: {
		      effect: { url: '/api/todos', method: 'POST', body: JSON.stringify({todo}) },
		      commit: { type: CREATE_TODO_COMMIT,meta : {todo,id}},
		      rollback : {type : ROLLBACK_CREATE_TODO,meta : {id}}
		  	}
  		}
	};
};

export const removeTodo = (id) => {

	return {
		type : REMOVE_TODO,
		payload : {id},
		meta : {
    		offline: {
		      effect: { url: '/api/todos', method: 'DELETE', body: JSON.stringify({id}) },
		      commit: { type: REMOVE_TODO_COMMIT,meta : {id}},
		      rollback : {type : ROLLBACK_REMOVE_TODO,meta : {id} }
		  	}
  		}
	};
};

export const updateTodo = (id,todo) => {
	return {
		type : UPDATE_TODO,
		payload : {id,todo},
		meta: {
    		offline: {
		      effect: { url: '/api/todos', method: 'PUT', body: JSON.stringify({id,todo}) },
		      commit: { type: UPDATE_TODO_COMMIT, meta : {id,todo}},
		      rollback : {type : ROLLBACK_UPDATE_TODO,meta : {id}}
		  	}
  		}
	};
};
