import * as types from './types/favoriteTypes';

export const addCityToFavorites = city => (dispatch, getState) => {
    dispatch({ type: types.ADD_CITY_TO_FAVORITES, payload: city });
    const { favoredCities } = getState();
    localStorage.favoredCities = JSON.stringify(favoredCities);
};

export const removeFromFavorites = city => (dispatch, getState) => {
    dispatch({ type: types.REMOVE_CITY_FROM_FAVORITES, payload: city.cityKey });
    const { favoredCities } = getState();
    localStorage.favoredCities = JSON.stringify(favoredCities);
};


