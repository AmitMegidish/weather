import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as api from "../constants";
import { fetchForecast } from "../store/actions/forecastActions";
import { FormControl } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const { useState, useEffect } = React;

const CitySearch = () => {
    const { isDarkMode } = useSelector(state => state.theme);

    const [searchValue, setSearchValue] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();

    const windowResizeHandler = () => setWindowWidth(window.innerWidth);

    const onChangeHandler = e => {
        let value = e.target.value;
        value = value.replace(/[^A-Za-z\s]/gi, "");

        setSearchValue(value);
    }

    const searchAutocompleteHandler = async () => {

        if (searchValue === "") {
            setAutocompleteOptions([]);
            return;
        }

        const { data } = await axios.get(`${api.baseURL + api.autoCompleteURL}`, {
            params: {
                apikey: api.apikey,
                q: searchValue
            }
        });

        setAutocompleteOptions(data);
    };

    const selectCityHandler = city => {
        dispatch(fetchForecast(city.Key, city.LocalizedName));
        setSearchValue("");
        setAutocompleteOptions([]);
    };

    useEffect(() => {
        const debounce = setTimeout(searchAutocompleteHandler, 750);

        return () => clearTimeout(debounce);
    }, [searchValue]);

    useEffect(() => {
        window.addEventListener('resize', windowResizeHandler);

        return () => {
            window.removeEventListener('resize', windowResizeHandler)
        }
    }, []);

    return (
        <>
            <FormControl
                value={searchValue}
                onChange={onChangeHandler}
                type='text'
                className={`info mx-auto mt-2 col-md-6 col-10 ${isDarkMode && "bg-primary text-light"}`}
                placeholder="Search For A City (English only)"
            />
            {/* <div className="position-relative"> */}
            {autocompleteOptions.length > 0 && (
                <ListGroup
                    className="l p-0 col-md-6 col-10 position-absolute"
                    style={{
                        left: `${windowWidth <= 767 ? "8%" : '25%'}`
                    }}
                >
                    {
                        autocompleteOptions.map(option => (
                            <ListGroup.Item
                                key={option.Key}
                                className={isDarkMode ? "bg-primary text-light" : ""}
                                action
                                onClick={() => { selectCityHandler(option) }}
                            >
                                {option.LocalizedName}, {option.Country.LocalizedName}.
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            )
            }
            {/* </div> */}
        </>
    );
};

export default CitySearch;
