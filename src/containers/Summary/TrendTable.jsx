import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableSortLabel,
    Box
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const mockData = [
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 250, confidence: '90%-100%' },
    { station: 'Mahoning Creek at Punxsutawney PA', value: 220, confidence: '90%-100%' },
    { station: 'Black River DS of STH 53 Bridge at Galesville', value: 220, confidence: '90%-100%' },
    { station: 'Turkey River near Garber', value: 220, confidence: '90%-100%' },
    { station: 'Bear Creek', value: 220, confidence: '90%-100%' },
    { station: 'Ouiska Chitto Creek Near Oberlin LA', value: 220, confidence: '66%-90%' },
    { station: 'Powder River at Moorhead MT', value: 100, confidence: '66%-90%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '66%-90%' },
    // Repeat the entry for demonstration
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '66%-90%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '66%-90%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '66%-90%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '66%-90%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '66%-90%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '33%-66%' },
    { station: 'Baraboo River Rowley Creek Bridge at CTH X', value: 100, confidence: '33%-66%' }
    // Add more rows as needed
];

export default function TrendTable() {
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedData = [...mockData].sort((a, b) =>
        sortOrder === 'asc' ? a.value - b.value : b.value - a.value);

    const handleSortRequest = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">Number of Significant Upward Trend Stations</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* Box component with fixed height and scroll */}
                <Box sx={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Water Quality Station Name</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active
                                        direction={sortOrder}
                                        onClick={handleSortRequest}
                                    >
                                        Most recent year flow values (10^6 kg/yr) ⬈
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Confidence Level</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.station}</TableCell>
                                    <TableCell>{row.value}</TableCell>
                                    <TableCell>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                padding: '4px 8px',
                                                backgroundColor:
                                row.confidence === '90%-100%' ?
                                    '#ffcccc' :
                                    row.confidence === '66%-90%' ?
                                        '#ffebcc' :
                                        '#f2f2f2',
                                                borderRadius: '20px',
                                                color: '#333',
                                                fontWeight: 500
                                            }}
                                        >
                                            {row.confidence}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
