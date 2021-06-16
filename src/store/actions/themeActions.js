import * as types from '../actions/types/themeTypes';

export const toggleTheme = () => (dispatch, getState) => {
    dispatch({ type: types.TOGGLE_THEME });
    const { theme } = getState();
    localStorage.theme = JSON.stringify(theme)
};