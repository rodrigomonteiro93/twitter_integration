import React from 'react';
import Home from './Pages/Home';
import Tweets from './Pages/Tweets';
import Screen from './Pages/Screen';

import { Route, Routes } from 'react-router-dom';

function RoutesComponent() {
    const routes = [{
        path: "/",
        exact: true,
        element: <Home />,
      }, {
        path: "/home",
        element: <Home />,
      }, {
        path: "/tweets",
        element: <Tweets />,
      }, {
        path: "/telao",
        element: <Screen />,
      }
    ];
    return(
    <Routes>
        {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} element={route.element} />
        ))}
    </Routes>
    )
}

export default RoutesComponent;