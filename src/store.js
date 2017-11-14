import {applyMiddleware, createStore} from 'redux';
import todoReducer from './reducers';
import { createLogger } from 'redux-logger';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import thunk from 'redux-thunk';
import localforage from 'localforage';
const INITIAL_STATE = {'todos' : []};

const effectReconciler = (effect,action) =>{
	return fetch(effect.url,{headers: {"Content-Type": "application/json"}, body : effect.body, method : effect.method}).then((res) => {
    	if(res.ok){
    		return res.json();
    	}
    	else{
    		return Promise.reject(res.text().then(msg => new Error(msg)));
    	}
    });
};

const _getMiddlewares = () => {
    let middlewares = [thunk];
    middlewares = [...middlewares, createLogger()];
    return applyMiddleware(...middlewares);
};

const configureStore = (initialState=INITIAL_STATE) => {
	const store = offline(Object.assign({},offlineConfig,{effect : effectReconciler,persistOptions: {storage: localforage}}))(createStore)(todoReducer, initialState, _getMiddlewares());
	return store;
};

export default configureStore;
