import * as types from "../actions/types/themeTypes";

let initialState;

if (localStorage.theme) {
    initialState = JSON.parse(localStorage.theme);
} else {
    initialState = {
        isDarkMode: false
    }
}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_THEME:
            return { ...state, isDarkMode: !state.isDarkMode }
        default:
            return state;
    }
};