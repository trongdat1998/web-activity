import React from "react";
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Index from './pages/index';
import Loading from './components/loading';


const routeMap = {
  index: '/activity/xo',
  detail: '/activity/xo/detail',
  buy: '/activity/xo/buy',
  address: '/activity/xo/address',
}

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={routeMap.index} component={Index} />
        <Route exact path={routeMap.detail} component={Loadable({
          loader: () => import('./pages/detail'),
          loading: Loading,
        })} />
        <Route exact path={routeMap.detail + '/:projectCode'} component={Loadable({
          loader: () => import('./pages/detail'),
          loading: Loading,
        })} />
        <Route exact path={routeMap.buy} component={Loadable({
          loader: () => import('./pages/subscribe'),
          loading: Loading,
        })} />
        <Route exact path={routeMap.buy + '/:projectCode'} component={Loadable({
          loader: () => import('./pages/subscribe'),
          loading: Loading,
        })} />
        <Route exact path={routeMap.address} component={Loadable({
          loader: () => import('./pages/address'),
          loading: Loading,
        })} />
        <Route exact path={routeMap.address + "/:orderId"} component={Loadable({
          loader: () => import('./pages/address'),
          loading: Loading,
        })} />
      </Switch>
    </Router>
  )
}

export default routes;

export {
  routeMap
}
