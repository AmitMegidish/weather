import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchForecast } from "../store/actions/forecastActions";
import { removeFromFavorites } from "../store/actions/favoritesActions";

const FavoritesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const { favoredCities } = useSelector(state => state.favoredCities);
    console.log(favoredCities);
    const { isDarkMode } = useSelector(state => state.theme);

    const removeFromFavored = city => {
        dispatch(removeFromFavorites(city));
    };

    const fetchChosenCity = city => {
        dispatch(fetchForecast(city.cityKey, city.cityName));
        history.push('/');
    };

    return (
        <>
            {(() => {
                if (!favoredCities.length) {
                    return (
                        <Alert variant={isDarkMode ? "dark" : "info"} className="text-center col-lg-6 col-md-8 col mx-auto">
                            <Alert.Heading>
                                You Have No Favored Cities Yet!
                           </Alert.Heading>
                            <hr />
                            <p className="text-left">
                                1. Go back home. <br />
                                2. Search for cities you like. <br />
                                3. Mark'Em as favorites.
                            </p>
                            <LinkContainer to='/'>
                                <Button>
                                    Go back home
                                </Button>
                            </LinkContainer>
                        </Alert>
                    );
                }

                if (favoredCities.length > 0) {
                    return (
                        <>
                            <h1 className={`text-center ${isDarkMode && "text-light"}`}>
                                Favorite Cities
                            </h1>
                            <ListGroup className="col-10 mx-auto">
                                {favoredCities.map(city => (
                                    <ListGroup.Item className={`d-flex justify-content-between ${isDarkMode && "bg-primary text-light"}`} key={city.cityKey}>
                                        <strong className="my-auto">
                                            {city.cityName}, {city.currentCondition[0].Temperature.Metric.Value.toFixed()}°C, {city.currentCondition[0].WeatherText}.
                                        </strong>
                                        <span className="d-flex flex-row-reverse bd-highlight">
                                            <Button className="m-1" variant='danger' onClick={() => removeFromFavored(city)}>
                                                Remove
                                            </Button>
                                            <Button className="m-1" onClick={() => fetchChosenCity(city)} >
                                                Forecast
                                            </Button>
                                        </span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </>
                    );
                }
            })()}
        </>
    );
};

export default FavoritesScreen;
