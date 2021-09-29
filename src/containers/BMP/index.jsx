// @flow
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { BaseControlPortal, Map } from '@geostreams/core/src/components/ol';
import Control from '@geostreams/core/src/components/ol/Control';
import { updateLoadingStatus } from '@geostreams/core/src/actions/page';
import logger from '@geostreams/core/src/utils/logger';

import type {
    Feature as FeatureType,
    Layer as LayerType,
    MapBrowserEventType
} from 'ol';
import type { Action as PageAction } from '@geostreams/core/src/actions/page';

import { BMP_API_URL, BOUNDARIES, INITIAL_FILTERS, LAYERS, MAP_CENTER, getStyle } from './config';
import { BMPContext } from './Context';
import Header from './Header';
import Sidebar from './Sidebar';

import type { Config, Filters, FiltersAction } from './flowtype';

const useStyle = makeStyles({
    mainContainer: {
        position: 'absolute',
        height: '100%'
    },
    mapContainer: {
        height: 'calc(100% - 50px)'
    },
    boundaryInfoMapControl: {
        top: '0.5em',
        right: '2em',
        background: '#fff',
        border: '2px solid #aaa',
        paddingTop: 10,
        maxWidth: 250
    },
    sidebar: {
        'height': 'calc(100% - 50px)',
        'overflowY': 'auto',
        '& a': {
            color: '#0D73C5'
        }
    }
});

const filtersReducer = (state: Filters = INITIAL_FILTERS, action: FiltersAction) => {
    switch (action.type) {
        case 'years':
            return {
                ...state,
                years: action.value
            };
        case 'boundaryType':
            return {
                ...state,
                boundaryType: action.value,
                selectedBoundaries: []
            };
        case 'selectedBoundaries':
            return {
                ...state,
                selectedBoundaries: action.value
            };
        case 'reset':
            return { ...INITIAL_FILTERS, selectedBoundaries: [] };
        default:
            return state;
    }
};

type Props = {
    dispatch: (pageAction: PageAction) => void;
};

const BMP = ({ dispatch }: Props) => {
    const classes = useStyle();

    const [results, updateResults] = React.useState({});

    const [filters, dispatchFilterUpdate] = React.useReducer<Filters, FiltersAction>(filtersReducer, INITIAL_FILTERS);

    const filtersRef = React.useRef<{ previous: Filters, current: Filters }>({
        previous: filters,
        current: filters
    });

    const [config, updateConfig] = React.useState<Config>({});
    const configRef = React.useRef<Config | null>(null);
    const hasConfig = Object.keys(config).length > 0;

    const mapControlsRef = React.useRef({
        boundaryInfo: new Control({
            className: classes.boundaryInfoMapControl
        })
    });

    const [hoveredBoundaryInfo, updateHoveredBoundaryInfo] = React.useState<[[string, string]]>([]);

    React.useEffect(
        () => {
            dispatch(updateLoadingStatus(true));
            Promise
                .all([
                    fetch(`${BMP_API_URL}/assumptions?limit=-1`).then((response) => response.json()),
                    fetch(`${BMP_API_URL}/states?limit=-1`).then((response) => response.json()),
                    fetch(`${BMP_API_URL}/huc8?limit=-1`).then((response) => response.json())
                ])
                .then(([assumptionsResponse, statesResponse, huc8Response]) => {
                    const configObj = {
                        assumptions: assumptionsResponse.results,
                        state: statesResponse.results,
                        huc_8: huc8Response.results
                    };
                    const boundaryOptions = configObj[filters.boundaryType].map(
                        (attrs) => attrs[BOUNDARIES[filters.boundaryType].idKey]
                    );
                    const activeLayer = LAYERS[filtersRef.current.current.boundaryType];
                    activeLayer.setStyle((feature) => getStyle(
                        boundaryOptions,
                        feature,
                        BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                        false
                    ));
                    configRef.current = configObj;
                    updateConfig(configObj);
                })
                .catch(logger.error)
                .finally(() => {
                    dispatch(updateLoadingStatus(false));
                });
        },
        []
    );

    React.useEffect(() => {
        if (hasConfig && config[filters.boundaryType]) {
            const previous = filtersRef.current.current;

            const boundaryOptions = config[filters.boundaryType].map(
                (attrs) => attrs[BOUNDARIES[filters.boundaryType].idKey]
            );

            if (previous.boundaryType !== filters.boundaryType) {
                // Switch layers
                const oldLayer = LAYERS[previous.boundaryType];
                oldLayer.setVisible(false);
                oldLayer.setStyle((feature) => getStyle(
                    boundaryOptions,
                    feature,
                    BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                    false
                ));
                LAYERS[filters.boundaryType].setVisible(true);
            }

            if (previous.selectedBoundaries !== filters.selectedBoundaries) {
                // Update styling of toggled boundaries
                LAYERS[filters.boundaryType].setStyle((feature) => getStyle(
                    boundaryOptions,
                    feature,
                    BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                    filters.selectedBoundaries.includes(
                        feature.get(BOUNDARIES[filters.boundaryType].layer.featureIdKey)
                    )
                ));
            }

            filtersRef.current = {
                previous,
                current: filters
            };
        }
    }, [filters]);

    const getMapEventTargetProps = (
        e: MapBrowserEventType
    ): {feature: FeatureType, layer: LayerType, boundaryOptions: [] } | null => {
        const currentConfig = configRef.current;
        const currentFilters = filtersRef.current.current;
        if (currentConfig && currentConfig[currentFilters.boundaryType]) {
            const boundaryProps = BOUNDARIES[currentFilters.boundaryType];
            const boundaryOptions = currentConfig[currentFilters.boundaryType].map(
                (attrs) => attrs[BOUNDARIES[currentFilters.boundaryType].idKey]
            );

            const targetObject: [FeatureType, LayerType] | null = e.map.forEachFeatureAtPixel(
                e.pixel,
                (feature, layer) => (
                    layer.get('interactive') && boundaryOptions.includes(feature.get(boundaryProps.layer.featureIdKey))
                ) ?
                    [feature, layer] : null
            );

            if (targetObject) {
                return {
                    feature: targetObject[0],
                    layer: targetObject[1],
                    boundaryOptions
                };
            }
        }
        return null;
    };

    const handleMapClick = React.useCallback((e: MapBrowserEventType) => {
        const clickedObjectProps = getMapEventTargetProps(e);
        if (clickedObjectProps) {
            const { feature: clickedFeature, layer: clickedLayer, boundaryOptions } = clickedObjectProps;
            const currentFilters = filtersRef.current.current;
            const boundaryProps = BOUNDARIES[currentFilters.boundaryType];

            const boundaryIndex = currentFilters.selectedBoundaries.indexOf(
                clickedFeature.get(boundaryProps.layer.featureIdKey)
            );
            const { selectedBoundaries } = currentFilters;
            if (boundaryIndex > -1) {
                // Deselect the feature
                selectedBoundaries.splice(boundaryIndex, 1);
            } else {
                // Select the feature
                selectedBoundaries.push(clickedFeature.get(boundaryProps.layer.featureIdKey));
            }

            clickedLayer.setStyle((feature) => getStyle(
                boundaryOptions,
                feature,
                boundaryProps.layer.featureIdKey,
                selectedBoundaries.includes(feature.get(boundaryProps.layer.featureIdKey))
            ));

            dispatchFilterUpdate({
                type: 'selectedBoundaries',
                value: selectedBoundaries
            });
        }
    });

    const handleMapHover = React.useCallback((e: MapBrowserEventType) => {
        const hoveredObjectProps = getMapEventTargetProps(e);
        if (hoveredObjectProps) {
            const currentFilters = filtersRef.current.current;
            if (currentFilters.boundaryType === 'state') {
                const { NAME: name } = hoveredObjectProps.feature.getProperties();
                updateHoveredBoundaryInfo([['Name', name]]);
            } else if (currentFilters.boundaryType === 'huc_8') {
                const { huc8, states, name } = hoveredObjectProps.feature.getProperties();
                updateHoveredBoundaryInfo([['HUC8', huc8], ['Name', name], ['State(s)', states]]);
            }
        } else {
            updateHoveredBoundaryInfo([]);
        }
    });

    return (
        <BMPContext.Provider
            value={{
                config,
                dispatchFilterUpdate,
                filters,
                results,
                updateResults
            }}
        >
            {hasConfig ?
                <Grid
                    className={classes.mainContainer}
                    container
                    alignItems="stretch"
                >
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid
                        className={classes.mapContainer}
                        item
                        xs={6}
                    >
                        <Map
                            className="fillContainer"
                            zoom={5}
                            center={MAP_CENTER}
                            layers={Object.values(LAYERS)}
                            layerSwitcherOptions={{}}
                            controls={[mapControlsRef.current.boundaryInfo]}
                            events={{
                                click: handleMapClick,
                                pointermove: handleMapHover
                            }}
                        >
                            <BaseControlPortal el={mapControlsRef.current.boundaryInfo.element}>
                                <Container>
                                    <Typography variant="subtitle2">
                                        Select boundaries using the map or the form on the right
                                    </Typography>
                                    <Divider />
                                    {hoveredBoundaryInfo.map(([label, value]) => (
                                        <Typography key={label} variant="body2">{label}: {value}</Typography>
                                    ))}
                                </Container>
                            </BaseControlPortal>
                        </Map>
                    </Grid>
                    <Grid
                        className={classes.sidebar}
                        item
                        xs={6}
                    >
                        <Sidebar />
                    </Grid>
                </Grid> :
                null}
        </BMPContext.Provider>
    );
};

export default connect()(BMP);
