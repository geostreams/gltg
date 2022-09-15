// @flow
import coreRoutes from '@geostreams/core/src/routes';
import hocs from '@geostreams/core/src/utils/hocs';
import GeoStreamingExplore from '@geostreams/geostreaming/src/containers/Explore';
import GeoStreamingSearch from '@geostreams/geostreaming/src/containers/Search';
import GeoStreamingSensorDetail from '@geostreams/geostreaming/src/containers/Sensor/Detail';

// $FlowFixMe
// import __old_Search from '@geostreams/gltg__old/app/pages/Search';
// $FlowFixMe
import __old_Analysis from '@geostreams/gltg__old/app/pages/Analysis';


import LandingPage from './containers/LandingPage';
import DataStories from './containers/DataStories';
import Help from './containers/Help';
import GLTGLayout from './containers/Layout';
import GLTGLandingLayout from './containers/LandingPageLayout';
import BMP from './containers/BMP';
import Summary from './containers/Summary';
import Tests from './tests/Tests';
import Partners from './containers/Partners';

const routes = Object.assign(
    coreRoutes,
    {
        '/': { exact: true, component: hocs.withLayout(GLTGLandingLayout, LandingPage, { hasFooter: true }) },
        '/summary': { exact: true, component: hocs.withLayout(GLTGLayout, Summary, { hasFooter: true, stickyFooter: true }) },
        '/data-stories': { component: hocs.withLayout(GLTGLayout, DataStories, { hasFooter: true }) },
        '/help': { exact: true, component: hocs.withLayout(GLTGLayout, Help, { hasFooter: true }) },
        '/partners': { exact: true, component: hocs.withLayout(GLTGLayout, Partners, { hasFooter: false }) },
        '/:parent(explore|search|analysis)/detail/location/:name/:category': { component: hocs.withLayout(GLTGLayout, GeoStreamingSensorDetail) },
        // Routes pointing to the __old code
        '/explore/:stations': { component: hocs.withLayout(GLTGLayout, GeoStreamingExplore), exact: true },
        '/search': { component: hocs.withLayout(GLTGLayout, GeoStreamingSearch), exact: true },
        '/analysis': { component: hocs.withLayout(GLTGLayout, __old_Analysis), exact: true },
        '/bmp': { component: hocs.withLayout(GLTGLayout, BMP), exact: true }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/__new_search'] = { component: hocs.withLayout(GLTGLayout, GeoStreamingSearch) };
    routes['/tests/gltg'] = { component: Tests };
}

export default routes;
