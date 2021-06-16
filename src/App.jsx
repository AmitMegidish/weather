import * as React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const App = () => {
  const { isDarkMode } = useSelector(state => state.theme);

  return (
    <Router>
      <Header />
      <main className={`py-3 ${isDarkMode ? "bg-secondary" : "light-bg"}`}>
        <Container>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/favorites' component={FavoritesScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
