/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsRegionsComponent from '@geostreams/core__old/app/components/TrendsRegions';
import {selectTrendsRegion, selectAnalysisRegion} from '@geostreams/core__old/app/actions';
import type {Dispatch} from '@geostreams/core__old/app/utils/flowtype';


const mapStateToProps = (state) => {

    return {
        chosenRegion: state.chosenTrends.region
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsRegion: (region, view_type) => {
            if (view_type === 'by-analysis') {
                dispatch(selectAnalysisRegion(region, view_type));
            }

            if (view_type === 'by-sensors' || view_type === 'by-regions') {
                dispatch(selectTrendsRegion(region, view_type));
            }
        }
    }
};

const TrendsRegions = connect(mapStateToProps, mapDispatchToProps)(TrendsRegionsComponent);

export default TrendsRegions;
