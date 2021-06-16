import * as types from "../actions/types/favoriteTypes";

let initialState;

if (localStorage.favoredCities) {
    initialState = {
        favoredCities: JSON.parse(localStorage.favoredCities).favoredCities
    };
} else {
    initialState = {
        favoredCities: []
    };
}

export const favoredCitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CITY_TO_FAVORITES:
            return {
                ...state,
                favoredCities: [...state.favoredCities, action.payload]
            };
        case types.REMOVE_CITY_FROM_FAVORITES:
            return {
                ...state,
                favoredCities: [...state.favoredCities.filter(city => city.cityKey !== action.payload)]
            };
        default:
            return state;
    }
};