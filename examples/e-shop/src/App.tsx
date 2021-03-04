import React from 'react';
import { hot } from 'react-hot-loader';
import { Container } from '@material-ui/core';
import { Header } from './components/header';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routeMap } from './router-paths';

import './style.scss';

export const App = hot(module)(() => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          {Object.entries(routeMap).map(([path, component], index) => (
            <Route exact path={path} key={index.toString()}>
              {component}
            </Route>
          ))}
        </Switch>
      </Container>
    </BrowserRouter>
  )
});
