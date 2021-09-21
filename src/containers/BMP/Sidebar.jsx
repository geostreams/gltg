// @flow
import React from 'react';
import Container from '@material-ui/core/Container';

import Filters from './Filters';
import Results from './Results';

const Sidebar = () => (
    <Container disableGutters>
        <Filters />
        <Results />
    </Container>
);

export default Sidebar;
