/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute';
import routes from './routes';
import '../../assets/css/style.css';

export default function App() {
  const showContentMain = () => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map(route => {
        if (route.private) {
          return (
            <PrivateRoute
              // key={index}
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
              permission={route.permisson}
            />
          );
        }
        return (
          <Route
            // key={index}
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  return showContentMain(routes);
}
