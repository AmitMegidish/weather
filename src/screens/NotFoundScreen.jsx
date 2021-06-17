import React from 'react';
import { useSelector } from "react-redux";
import { Alert, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFoundScreen = () => {
    const { isDarkMode } = useSelector(state => state.theme);

    return (
        <Alert variant={isDarkMode ? "dark" : "info"} className="shadow text-center col-md-6 col mx-auto">
            <Alert.Heading>
                OOOOOOPS.
            </Alert.Heading>
            <hr />
            <p>
                Seems like you got lost. <br />
                No worries though!
            </p>
            <LinkContainer to='/'>
                <Button>
                    Go back home
                </Button>
            </LinkContainer>
        </Alert>
    );
};

export default NotFoundScreen;
