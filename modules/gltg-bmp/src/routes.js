// @flow
import hocs from '@geostreams/core/src/utils/hocs';

import type { Routes } from '@geostreams/core/src/routes';

import Layout from './containers/Layout';
import Home from './containers/Home';
import Tests from './tests/Tests';

const routes: Routes = {
    '/': { component: hocs.withLayout(Layout, Home), exact: true }
};

if (process.env.NODE_ENV === 'development') {
    routes['/tests'] = { component: Tests };
}

export default routes;
