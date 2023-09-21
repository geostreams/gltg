import React from 'react';
import { VegaLite } from 'react-vega';

type Props = {
    graph_data: {};
    width: number;
    height: number;
    startAtZero: boolean;
    y_line_field: string;
    y_scatter_field: string;
    y_label?: string;
    x_label?: string;
    title?: string;
}

const SummaryGraph: React.FC<Props> = (props) => {
    const {
        graph_data,
        width,
        height,

        y_line_field,
        y_scatter_field,
        y_label,
        x_label,
        title
    } = props;

    const spec = {
        width,
        height,
        data: { name: 'table' },
        title,
        layer: [
            {
                mark: { type: 'line' },
                encoding: {
                    x: { field: 'year', type: 'temporal', timeUnit: 'year', axis: { title: x_label, format: 's' } },
                    y: { field: y_line_field, type: 'quantitative', axis: { title: y_label, format: 's' } },
                    color: { value: '#90EE90' }
                }
            },
            {
                mark: { type: 'point', filled: true, tooltip: true },
                encoding: {
                    x: { field: 'year', type: 'temporal', timeUnit: 'year' },
                    y: { field: y_scatter_field, type: 'quantitative' },
                    color: { value: 'black' },
                    tooltip: [
                        { field: 'year', type: 'temporal', timeUnit: 'year', title: 'Year' },
                        { field: y_scatter_field, type: 'quantitative', title: y_label }
                    ]
                },
                params: [
                    {
                        name: 'hover',
                        select: {
                            type: 'point',
                            fields: [
                                'year'
                            ],
                            on: 'mouseover',
                            clear: 'mouseout'
                        }
                    }
                ]
            }
        ]

    };
    return(<VegaLite spec={spec} data={{ table : graph_data }}
        actions={{ export: true, source: false, compiled: false }} />);
};

SummaryGraph.defaultProps = {
    width: 800,
    height: 300,
    startAtZero: false,
    yLabel: 'value',
    xLabel: 'year',
    title: 'Summary Graph'
};

export default SummaryGraph;
