/*
 * @flow
 */

import {connect} from 'react-redux';
import {switchBackend, fetchSensors} from '@geostreams/core__old/app/actions';
import SwitchAPIComponent from '@geostreams/core__old/app/components/SwitchAPI';
import type {Dispatch} from '@geostreams/core__old/app/utils/flowtype';


const mapStateToProps = (state) => {

    return {
        selected: state.backends.selected,
        endpoints: state.backends.endpoints,
        error: state.backends.error
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onBackendChange: (selected: string, title: string, subtitle: string) => {
            dispatch(switchBackend(selected, title, subtitle));
            dispatch(fetchSensors(selected))
        }
    }
};

const SwitchAPI = connect(mapStateToProps, mapDispatchToProps)(SwitchAPIComponent);

export default SwitchAPI;
