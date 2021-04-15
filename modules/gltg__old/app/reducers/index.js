/*
 * @flow
 */

import backends from '@geostreams/core__old/app/reducers/backends';
import sensors from '@geostreams/core__old/app/reducers/sensors';
import searchFilters from '@geostreams/core__old/app/reducers/searchFilters';
import selectedSearch from '@geostreams/core__old/app/reducers/selectedSearch';
import exploreLayers from '@geostreams/core__old/app/reducers/exploreLayers';
import exploreFiltering from '@geostreams/core__old/app/reducers/exploreFiltering';
import parameters from '@geostreams/core__old/app/reducers/parameters';

import sensorDetail from './sensorDetail';
import chosenTrends from './chosenTrends';


const geodashboardApp = {
    backends,
    searchFilters,
    sensors,
    selectedSearch,
    sensorDetail,
    chosenTrends,
    exploreLayers,
    exploreFiltering,
    parameters
};

export default geodashboardApp;
