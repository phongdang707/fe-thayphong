import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';

export default function Exams() {
  const showContentMain = () => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return <Switch>{result}</Switch>;
  };
  return <>{showContentMain()}</>;
}
