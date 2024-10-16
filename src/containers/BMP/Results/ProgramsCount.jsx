// @flow
import React from "react";
import { VegaLite } from "react-vega";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { entries } from "@geostreams/core/src/utils/array";
import { precision } from "@geostreams/core/src/utils/format";

import type { ElementRect } from "@geostreams/core/src/utils/flowtype";

import type { Filters, QueryParams } from "../flowtype";

export const config = {
	label: "Programs Count",
	prepareParams: (params: QueryParams) => {
		params.group_by.push("program");
		params.group_by.push("applied_date");
		params.aggregates.push("program-count");
		params.order_by.push("-program-count");
	},
	chartSpec: {
		data: { name: "program_count" },
		mark: "bar",
		selection: {
			program: {
				type: "multi",
				fields: ["program"],
				bind: "legend",
			},
		},
		encoding: {
			row: { field: "", title: "" },
			x: {
				field: "program-count",
				title: "Count",
				type: "quantitative",
				axis: { format: ",.0d" },
			},
			y: { field: "applied_date", title: "Year" },
			color: {
				field: "program",
				scale: { scheme: "category10" },
				title: "Program",
				legend: { orient: "top" },
			},
			opacity: {
				condition: { selection: "program", value: 1 },
				value: 0.2,
			},
			tooltip: { field: "program-count", format: ",.01d" },
		},
	},
};

const useStyle = makeStyles({
	tableContainer: {
		marginBottom: 5,
	},
});

type Props = {
	filters: Filters,
	/** Sample data
	 * [
	 *   { "state": "Indiana", "program": "EQIP", "applied_date": 2015, "program-count": 2952 },
	 *   { "state": "Indiana", "program": "EQIP", "applied_date": 2016, "program-count": 2809 },
	 *   ...
	 * ]
	 */
	data: Array<{
		program: string,
		applied_date: number,
		"program-count": number,
		// Each item has only one of the following boundary types:
		state?: string,
		huc_8?: string,
	}>,
	containerRect: ElementRect,
	showVegaActions: boolean,
};

const ProgramsCount = (props: Props) => {
	const classes = useStyle();

	const { containerRect, filters, showVegaActions } = props;

	if (filters.selectedBoundaries.length) {
		if (filters.boundaryType === "state") {
			config.chartSpec.encoding.row.field = "state";
			config.chartSpec.encoding.row.title = "State";
		} else if (filters.boundaryType === "huc_8") {
			config.chartSpec.encoding.row.field = "huc_8";
			config.chartSpec.encoding.row.title = "HUC8";
		}
	} else {
		config.chartSpec.encoding.row = { field: "", title: "" };
	}

	const programsSet = new Set();
	const tableData = {};
	props.data.forEach((d) => {
		const boundaryId: string = filters.selectedBoundaries.length
			? (d[filters.boundaryType]: any)
			: "Total";

		programsSet.add(d.program);

		if (tableData[boundaryId]) {
			tableData[boundaryId][d.program] =
				(tableData[boundaryId][d.program] || 0) +
				(d["program-count"] || 0);
		} else {
			tableData[boundaryId] = {
				[d.program]: d["program-count"] || 0,
			};
		}
	});
	const programs = Array.from(programsSet);

	return (
		<>
			<Typography variant="body1" paragraph>
				Distribution of the number of total conservation practices
				across selected area by year. Conservation practices are
				distinguished by funding source.
			</Typography>
			<VegaLite
				width={(containerRect.width || 0) * 0.6}
				height={(containerRect.height || 0) * 0.6}
				actions={
					showVegaActions && {
						export: true,
						source: process.env.NODE_ENV === "development",
						compiled: process.env.NODE_ENV === "development",
						editor: process.env.NODE_ENV === "development",
					}
				}
				data={{ program_count: props.data }}
				spec={config.chartSpec}
			/>
			<TableContainer className={classes.tableContainer}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell />
							{programs.map((program) => (
								<TableCell key={program} align="center">
									{program}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{entries(tableData).map(
							([boundary, boundaryPrograms]) => (
								<TableRow key={boundary}>
									<TableCell>{boundary}</TableCell>
									{programs.map((program: string) => (
										<TableCell key={program} align="center">
											{precision(
												boundaryPrograms[program] || 0,
												0,
											)}
										</TableCell>
									))}
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

ProgramsCount.defaultProps = {
	showVegaActions: true,
};

export default ProgramsCount;
