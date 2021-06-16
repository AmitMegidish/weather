import * as types from '../actions/types/forecastTypes';

const initialState = {};

export const forecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FORECAST_REQUEST:
            return { ...state, loading: true, };
        case types.FORECAST_SUCCESS:
            return {
                ...state,
                loading: false,
                cityKey: action.payload.cityKey,
                cityName: action.payload.cityName,
                forecast: action.payload.forecast,
                currentCondition: action.payload.currentCondition
            };
        case types.FORECAST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};