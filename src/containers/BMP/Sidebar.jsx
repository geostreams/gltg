// @flow
import React, { useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';

import SpecificFilters from './SpecificFilters';
import Results from './Results';
import OverallFilters from './OverallFilters';



const Sidebar = ({ onTabChange, setParameterString }) => {
    const [value, setValue] = React.useState('overall');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onTabChange(newValue);
    };
   
    return (
        <Container disableGutters>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                centered
            >
                <Tab value="overall" label="Overall" />
                <Tab value="specific" label="Specific" />
            </Tabs>
            { value === 'overall' ? <OverallFilters  setParameterString={setParameterString} /> : <SpecificFilters /> }
            { value === 'overall' ? null : <Results /> }
        </Container>
    );
};

export default Sidebar;
