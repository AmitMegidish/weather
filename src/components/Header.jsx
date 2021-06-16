import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toggleTheme } from "../store/actions/themeActions";

const Header = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector(state => state.theme);

    return (
        <Navbar
            bg={isDarkMode ? "primary" : "info"}
            variant='dark'
            expand="lg"
            className='sticky-top'
            collapseOnSelect>
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        My Weather
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <LinkContainer to='/'>
                            <Nav.Link active className="nav-items">
                                Home
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/favorites'>
                            <Nav.Link className="nav-items" active>
                                Favotrites
                            </Nav.Link>
                        </LinkContainer>
                        <Nav.Link className="nav-items" active onClick={() => dispatch(toggleTheme())}>
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
