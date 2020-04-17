import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';

import quran from './quran/reducer';

const rootReducer = combineReducers({
  quran,
});

const middlewares = [thunkMiddleware];
const middleWareEnhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, compose(middleWareEnhancer));

export default store;
