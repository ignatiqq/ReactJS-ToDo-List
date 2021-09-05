import { createStore, compose, applyMiddleware }  from 'redux';
import rootReducers from "./reducers/index.js";
import thunk from 'redux-thunk';

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))

window.store = store

export default store;