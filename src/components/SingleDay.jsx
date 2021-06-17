import * as React from 'react';
import { useSelector } from "react-redux";
import { Card, Image } from 'react-bootstrap';


const SingleDay = ({ forecast, renderIcon }) => {
    const { isDarkMode } = useSelector(state => state.theme);

    return (
        <Card className={`my-3 pt-2 rounded ${isDarkMode ? "bg-primary text-light" : "border border-info"} h-100 text-center shadow`}>
            <Card.Body className="p-1">
                <Card.Title>
                    <strong>
                        {forecast.Date.slice(0, 10).split("-").reverse().join("-")}
                    </strong>
                </Card.Title>
                <div className="text-center" >
                    <Image className="mt-1 text-center" src={renderIcon(forecast.Day.Icon)} />
                </div>
                <Card.Text as='div'>
                    <h5 className="m-0">
                        {forecast.Day.IconPhrase}
                    </h5>
                    <h5 className="pt-1">
                        {forecast.Temperature.Maximum.Value.toFixed()}°C / {forecast.Temperature.Minimum.Value.toFixed()}°C
                    </h5>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SingleDay;