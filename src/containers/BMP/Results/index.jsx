// @flow
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { updateLoadingStatus } from '@geostreams/core/src/actions/page';
import { entries } from '@geostreams/core/src/utils/array';
import { useElementRect } from '@geostreams/core/src/utils/hooks';
import logger from '@geostreams/core/src/utils/logger';

import type { Action as PageAction } from '@geostreams/core/src/actions/page';

import { BMP_API_URL } from '../config';
import { BMPContext } from '../Context';
import { RESULTS, createRequestParams } from './config';
import Pdf from './Pdf';


const useStyle = makeStyles((theme) => ({
    mainContainer: {
        padding: theme.spacing(2)
    },
    outlinedButton: {
        color: '#1677B6',
        borderColor: '#1677B6'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    },
    plotContainer: {
        height: '100%',
        overflowY: 'auto'
    },
    plotTooltip: {
        position: 'fixed',
        background: '#283d4b',
        color: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    },
    pdfDialogAppBar: {
        position: 'relative'
    },
    pdfDialogTitle: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

type Props = {
    dispatch: (pageAction: PageAction) => void;
};

const Results = ({ dispatch }: Props) => {
    const classes = useStyle();

    // Is the pdf view open?
    const [pdfView, updatePdfView] = React.useState(false);

    const { filters, results, updateResults } = React.useContext(BMPContext);

    const [activeResultKey, updateActiveResultKey] = React.useState<string>('');
    const [activeResultCategory, updateActiveResultCategory] = React.useState<$Keys<typeof RESULTS>>('');
    const { component: ResultComponent } = RESULTS[activeResultCategory] || {};

    const plotTooltipRef = React.useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
        updateActiveResultCategory('');
    }, [filters]);

    React.useEffect(() => {
        if (activeResultCategory) {
            const queryParams = createRequestParams(activeResultCategory, filters);
            const queryParamsBase64 = btoa(queryParams);
            if (results[queryParamsBase64]) {
                updateActiveResultKey(queryParamsBase64);
            } else {
                dispatch(updateLoadingStatus(true));
                fetch(
                    `${BMP_API_URL}/practices?${queryParams}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
                    .then((response) => response.json())
                    .then((response) => {
                        updateResults({
                            ...results,
                            [queryParamsBase64]: response.results
                        });
                        updateActiveResultKey(queryParamsBase64);
                    })
                    .catch(logger.error)
                    .finally(() => {
                        dispatch(updateLoadingStatus(false));
                    });
            }
        }
    }, [activeResultCategory]);

    const plotContainer = React.useRef();
    const plotContainerRect = useElementRect(plotContainer);

    return (
        <Container className={classes.mainContainer}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Results</Typography>
                <Button
                    className={classes.outlinedButton}
                    variant="outlined"
                    onClick={() => updatePdfView(true)}
                >
                    Download PDF
                </Button>
            </Box>
            <FormControl className={classes.formControl} variant="outlined">
                <Select
                    displayEmpty
                    value={activeResultCategory}
                    onChange={({ target: { value } }) => {
                        updateActiveResultKey('');
                        updateActiveResultCategory(value);
                    }}
                >
                    <MenuItem value="">
                        <i>{activeResultCategory ? '------' : 'Select a category'}</i>
                    </MenuItem>
                    {entries(RESULTS).map(([name, { config: { label } }]) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {ResultComponent && results[activeResultKey] ?
                <ResultComponent
                    filters={filters}
                    data={results[activeResultKey]}
                    containerRect={plotContainerRect}
                    tooltipRef={plotTooltipRef}
                /> :
                null}
            <div ref={plotTooltipRef} className={classes.plotTooltip} />
            {pdfView ? <Pdf handleClose={() => updatePdfView(false)} /> : null}
        </Container>
    );
};

export default connect()(Results);
