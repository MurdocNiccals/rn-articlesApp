import { createStore, combineReducers ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Reducers
import { Reducer } from './Reducers/Reducer';

const reducers = combineReducers({
    news: Reducer
})

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;