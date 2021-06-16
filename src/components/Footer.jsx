import * as React from 'react';
import { useSelector } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const { isDarkMode } = useSelector(state => state.theme);

    return (
        <footer className={`pt-2 ${isDarkMode ? "bg-primary" : "light-bg"}`}>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <span className={isDarkMode ? "text-light" : "text-info"}>
                            - Copyright &copy; Weather Hero 2021 -
                        </span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
