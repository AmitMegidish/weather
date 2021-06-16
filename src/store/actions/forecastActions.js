import axios from "axios";
import * as types from "./types/forecastTypes";
import * as api from "../../constants";

export const fetchForecast = (cityKey, cityName) => async dispatch => {
    try {
        dispatch({ type: types.FORECAST_REQUEST });

        const { data: currentCondition } = await axios.get(`${api.baseURL + api.currentConditionURL + cityKey}`, {
            params: {
                apikey: api.apikey
            }
        });

        const { data: forecast } = await axios.get(`${api.baseURL + api.fiveDaysForecastURL + cityKey}`, {
            params: {
                apikey: api.apikey,
                metric: true
            }
        });

        const weatherData = {
            cityName,
            cityKey,
            currentCondition,
            forecast: forecast.DailyForecasts
        };

        dispatch({ type: types.FORECAST_SUCCESS, payload: weatherData });
    } catch (error) {
        dispatch({ type: types.FORECAST_FAIL, payload: error.message });
    }
};