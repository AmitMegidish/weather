import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCityToFavorites, removeFromFavorites } from "../store/actions/favoritesActions";
import { Form } from "react-bootstrap";

const { useState, useEffect } = React;

const AddToFavored = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector(state => state.theme);

    const { favoredCities } = useSelector(state => state.favoredCities);
    const { cityName, cityKey, currentCondition } = useSelector(state => state.forecast);

    const [isChecked, setIsChecked] = useState(false);
    const switchLabel = isChecked ? "Remove From Favorites" : "Add To Favorites";

    const toggleHandler = () => {
        const isFavored = favoredCities.some(city => city.cityKey === cityKey);
        if (isFavored) {
            dispatch(removeFromFavorites({ cityKey }));
            setIsChecked(false);
        } else {
            dispatch(addCityToFavorites({ cityKey, cityName, currentCondition }));
            setIsChecked(true);
        }
    };

    useEffect(() => {
        const isFavored = favoredCities.find(favored => favored.cityKey === cityKey);
        if (isFavored) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [cityKey, favoredCities]);

    return (
        <div className="mt-2">
            <Form.Check
                className={isDarkMode ? "text-light" : "text-info"}
                type="switch"
                label={switchLabel}
                checked={isChecked}
                onChange={toggleHandler}
                id={cityKey}
            />
        </div>
    );
};

export default AddToFavored;
