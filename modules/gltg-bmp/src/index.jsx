// @flow
import reducers from '@geostreams/core/src/reducers';
import render from '@geostreams/core/src/render';

import routes from './routes';

render(reducers, routes);
