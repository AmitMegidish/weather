import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { favoredCitiesReducer } from "./reducers/favoredCitiesReducer";
import { forecastReducer } from "./reducers/forecastReducer";
import { themeReducer } from './reducers/themeReducer';


const rootReducer = combineReducers({
    favoredCities: favoredCitiesReducer,
    forecast: forecastReducer,
    theme: themeReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
