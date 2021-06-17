import * as React from 'react';
import * as api from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import SingleDay from "../components/SingleDay";
import { fetchForecast } from "../store/actions/forecastActions";
import { Row, Col, Spinner, Alert, Image } from "react-bootstrap";
import CitySearch from '../components/CitySearch';
import AddToFavored from '../components/AddToFavored';

const { useEffect } = React;

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, forecast, currentCondition, cityName, cityKey } = useSelector(state => state.forecast);
    const { isDarkMode } = useSelector(state => state.theme);

    const renderIcon = iconNumber => {
        if (iconNumber <= 9) {
            iconNumber = "0" + iconNumber;
        }
        return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
    };

    useEffect(() => {
        if (!cityName && !cityKey) {
            dispatch(fetchForecast(api.telAvivKey, "Tel Aviv"));
        }
    }, [dispatch, cityKey, cityName]);

    return (
        <>
            {(() => {
                if (error) {
                    return (
                        <Alert variant={isDarkMode ? "dark" : "info"} className="text-center mt-1 col-md-6 col mx-auto">
                            <Alert.Heading>
                                An Error has occurred
                            </Alert.Heading>
                            <hr />
                            <p>
                                <strong>
                                    {error}
                                </strong>
                            </p>
                        </Alert>
                    );
                }

                if (loading) {
                    return (
                        <div className='text-center mt-5 pt-5'>
                            <Spinner animation="grow" variant={isDarkMode ? "dark" : "info"} />
                        </div>
                    );
                }

                if (currentCondition && forecast) {
                    return (
                        <>
                            <CitySearch />
                            <Row className="mt-2">
                                <Col md={9} sm={8} xs={6}>
                                    <h2 className={isDarkMode ? "text-light" : ""}>
                                        {cityName}
                                    </h2>
                                </Col>
                                <Col md={3} sm={4} xs={6} >
                                    <AddToFavored />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4.5} xs={3} />
                                <Col md={3} xs={6} className={`shadow m-auto ${isDarkMode ? "bg-primary text-light" : "border border-info bg-white"} rounded`}>
                                    <div className="text-center m-0 pt-2" >
                                        <h3>Current Weather</h3>
                                        <Image className="mt-1 text-center" src={renderIcon(currentCondition[0].WeatherIcon)} />
                                    </div>
                                    <h5 className="text-center">
                                        {currentCondition[0].WeatherText}
                                    </h5>
                                    <h4 className="text-center">{currentCondition[0].Temperature.Metric.Value}°C</h4>
                                </Col>
                                <Col md={4.5} xs={3} />
                            </Row>
                            <Row>
                                {forecast.map(day => (
                                    <Col className="p-1" key={day.EpochDate} sm={12} md={6} lg={4} xl={3}>
                                        <SingleDay renderIcon={renderIcon} forecast={day} />
                                    </Col>
                                ))}
                            </Row>
                        </>
                    );
                }
            })()}
        </>
    );
};

export default HomeScreen;
