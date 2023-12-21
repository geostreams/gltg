// @flow

/* eslint-disable */
// $FlowFixMe
const __old_config = require("@geostreams/gltg__old/config");
window.configruntime = __old_config;

// $FlowFixMe
import {
	addEndpoints,
	fetchSensors as __old_fetchSensors,
} from "@geostreams/core__old/app/actions";

import render from "@geostreams/core/src/render";
import { updateGeoStreamingConfig } from "@geostreams/geostreaming/src/actions/config";
import { fetchParameters } from "@geostreams/geostreaming/src/actions/parameters";
import { fetchSensors } from "@geostreams/geostreaming/src/actions/sensors";

import reducers from "./reducers";
import routes from "./routes";
import fetch from "sync-fetch";
/* eslint-enable */

render(reducers, routes, async (store) => {
	// Loading config.json dynamically and setting env variables
	const config = fetch("../config.json").json();
	config.map.geoserverUrl = process.env.GEOSERVER_URL;
	config.geostreamingEndpoint = process.env.GEOSTREAMS_URL;

	store.dispatch(updateGeoStreamingConfig(config));
	store.dispatch(addEndpoints());
	store.dispatch(__old_fetchSensors(config.geostreamingEndpoint));
	store.dispatch(fetchParameters());
	store.dispatch(fetchSensors());
});
