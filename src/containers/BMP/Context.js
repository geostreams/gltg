// @flow
import React from 'react';

import { INITIAL_FILTERS } from './config';

import type { BMPContextType } from './flowtype';

export const BMPContext = React.createContext<BMPContextType>({
    config: {},
    filters: INITIAL_FILTERS,
    // eslint-disable-next-line no-unused-vars
    dispatchFilterUpdate: (action) => {},
    results: {},
    // eslint-disable-next-line no-unused-vars
    updateResults: (results) => {}
});
