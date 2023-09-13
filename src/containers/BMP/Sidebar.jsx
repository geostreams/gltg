// @flow
import React, { useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';

import SpecificFilters from './SpecificFilters';
import Results from './Results';
import OverallFilters from './OverallFilters';



const Sidebar = () => {
    const [value, setValue] = React.useState('overall');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container disableGutters>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
            >
                <Tab value="overall" label="Overall" />
                <Tab value="specific" label="Specific" />
            </Tabs>
            { value === 'overall' ? <OverallFilters /> : <SpecificFilters /> }
            <Results />
        </Container>
    );
};

export default Sidebar;
