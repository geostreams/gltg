import React, { useEffect, useState } from "react";
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
	Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import nitrateStationGeoData from "../../data/nitrate_trend_stations_20_years.geojson";
import phosStationGeoData from "../../data/phos_trend_stations_20_years.geojson";
import { set } from "date-fns";

const confidenceMapping = {
	1: "0%-10%",
	2: "10%-33%",
	3: "33%-66%",
	4: "66%-90%",
	5: "90%-100%",
};

// Utility function to parse the GeoJSON data
const parseTrendJSONData = (data, trendTableData, selectedParameter) => {
	try {
		if (data) {
			return data.features.map((feature) => {
				const {
					SF_station_nm,
					conc_trend_inc_prob_range,
					conc_icon_trend,
					flux_icon_trend,
					flux_trend_inc_prob_range,
					WQ_MonitoringLocationIdentifier,
					SF_site_no,
				} = feature.properties;
				// Getting the last years value for that parameter
				// TODO - The parameter can switch between conc and flux, need to handle this

				let ret = null;
				switch (selectedParameter) {
					case "concentration":
						ret = {
							station: SF_station_nm,
							confidence_range: conc_trend_inc_prob_range,
							trend: conc_icon_trend,
							confidence:
								confidenceMapping[conc_trend_inc_prob_range] ||
								"Unknown",
							lastValue:
								trendTableData[
									WQ_MonitoringLocationIdentifier
								].concentration.slice(-1)[0]
									.nonStationaryFNConc,
							SF_site_no,
						};
						break;
					case "flux":
						ret = {
							station: SF_station_nm,
							confidence_range: flux_trend_inc_prob_range,
							trend: flux_icon_trend,
							confidence:
								confidenceMapping[flux_trend_inc_prob_range] ||
								"Unknown",
							lastValue:
								trendTableData[
									WQ_MonitoringLocationIdentifier
								].flux.slice(-1)[0].nonStationaryFNFlux,
							SF_site_no,
						};
				}
				return ret;
			});
		}
		return null;
	} catch (error) {
		console.error("Error parsing JSON data:", error);
		return [];
	}
};

const TrendStationTable = ({
	data,
	title,
	selectedParameter,
	onSelectStation,
	selectedStation,
	setShowCharts,
}) => {
	const [sortOrder, setSortOrder] = useState("desc");
	const [sortColumn, setSortColumn] = useState("lastValue"); // Track the column being sorted
	const [sortedData, setSortedData] = useState([]);

	useEffect(() => {
		const sorted = [...data].sort((a, b) => {
			if (sortColumn === "lastValue") {
				return sortOrder === "asc"
					? a.lastValue - b.lastValue
					: b.lastValue - a.lastValue;
			} else if (sortColumn === "station") {
				return sortOrder === "asc"
					? a.station.localeCompare(b.station)
					: b.station.localeCompare(a.station);
			} else if (sortColumn === "confidence") {
				return sortOrder === "asc"
					? a.confidence_range - b.confidence_range
					: b.confidence_range - a.confidence_range;
			}
			return 0;
		});
		setSortedData(sorted);
	}, [data, sortOrder, sortColumn]);

	const handleSortRequest = (column) => {
		if (sortColumn === column) {
			setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
		} else {
			setSortColumn(column);
			setSortOrder("asc");
		}
	};

	const handleRowClick = (watershedID) => {
		if (watershedID === selectedStation) {
			// If the row clicked is the currently selected one, show charts
			setShowCharts(true);
		} else {
			onSelectStation(watershedID);
		}
	};

	const chooseConfidenceColor = (confidence) => {
		switch (confidence) {
			case "90%-100%":
			case "66%-90%":
				return "#ffcccc";
			case "33%-66%":
				return "#ffebcc";
			default:
				return "#68f28d";
		}
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel-content"
				id="panel-header"
			>
				<Typography
					variant="h6"
					style={{
						fontWeight: 400,
						size: "1rem",
						color: "#2D3C4A",
					}}
				>
					{title}
				</Typography>
				<Typography
					variant="subtitle1"
					style={{
						marginLeft: "auto",
						fontWeight: 700,
						size: "1rem",
						color: "#2D3C4A",
					}}
				>
					{sortedData.length}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>
									<TableSortLabel
										active={sortColumn === "station"}
										direction={sortOrder}
										onClick={() =>
											handleSortRequest("station")
										}
									>
										Water Quality Station Name
									</TableSortLabel>
								</TableCell>
								<TableCell
									sortDirection={
										sortColumn === "lastValue"
											? sortOrder
											: false
									}
								>
									<TableSortLabel
										active={sortColumn === "lastValue"}
										direction={sortOrder}
										onClick={() =>
											handleSortRequest("lastValue")
										}
									>
										{selectedParameter === "concentration"
											? "Most recent flow normalized concentration (mg/L)"
											: "Most recent flow normalized load (10^4 kg/yr)"}
									</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel
										active={sortColumn === "confidence"}
										direction={sortOrder}
										onClick={() =>
											handleSortRequest("confidence")
										}
									>
										Probability of Increasing Trend
									</TableSortLabel>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sortedData.map((row) => (
								<TableRow
									key={row.SF_site_no}
									onClick={() =>
										handleRowClick(row.SF_site_no)
									}
									hover
									style={{
										cursor: "pointer",
										backgroundColor:
											row.SF_site_no === selectedStation
												? "#f0f0f0"
												: "inherit",
									}}
								>
									<TableCell>{row.station}</TableCell>
									<TableCell>{row.lastValue}</TableCell>
									<TableCell>
										<span
											style={{
												display: "inline-block",
												padding: "4px 8px",
												backgroundColor:
													chooseConfidenceColor(
														row.confidence
													),
												borderRadius: "20px",
												color: "#333",
												fontWeight: 500,
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
};

export default function TrendTables({
	trendTableData,
	selectedNutrient,
	selectedParameter,
	setSelectedTrendTableStation,
	showCharts,
	setShowCharts,
}) {
	const [trendStationData, setTrendStationData] = useState({});
	const [upwardTrendData, setUpwardTrendData] = useState([]);
	const [downwardTrendData, setDownwardTrendData] = useState([]);
	const [stableTrendData, setStableTrendData] = useState([]);
	const [selectedStation, setSelectedStation] = useState(null);

	useEffect(() => {
		const fetchGeoJSONData = async () => {
			try {
				let response = null;
				switch (selectedNutrient) {
					case "Nitrogen":
						response = await fetch(nitrateStationGeoData);
						break;
					case "Phosphorus":
						response = await fetch(phosStationGeoData);
						break;
				}
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const geoJSONData = await response.json();
				setTrendStationData(geoJSONData);
			} catch (error) {
				console.error("Error fetching GeoJSON data:", error);
			}
		};
		fetchGeoJSONData();
	}, [selectedNutrient]);

	useEffect(() => {
		if (trendTableData && Object.keys(trendTableData).length > 0) {
			const parsedData = parseTrendJSONData(
				trendStationData,
				trendTableData,
				selectedParameter
			);
			const filterData = (trendType) =>
				parsedData.filter((station) => station.trend === trendType);

			setUpwardTrendData(filterData("Upward Trend"));
			setDownwardTrendData(filterData("Downward Trend"));
			setStableTrendData(filterData("No Significant Trend"));
		}
	}, [selectedParameter, trendStationData, trendTableData]);

	const handleSelectStation = (watershedID) => {
		setSelectedTrendTableStation(watershedID);
		setSelectedStation(watershedID);
	};

	useEffect(() => {
		if (!showCharts) {
			setSelectedTrendTableStation(null);
			setSelectedStation(null);
		}
	}, [showCharts]);

	return (
		<div>
			<TrendStationTable
				data={upwardTrendData}
				title="Likely Upward Trend Stations"
				selectedParameter={selectedParameter}
				onSelectStation={handleSelectStation}
				selectedStation={selectedStation}
				setShowCharts={setShowCharts}
			/>
			<TrendStationTable
				data={downwardTrendData}
				title="Likely Downward Trend Stations"
				selectedParameter={selectedParameter}
				onSelectStation={handleSelectStation}
				selectedStation={selectedStation}
				setShowCharts={setShowCharts}
			/>
			<TrendStationTable
				data={stableTrendData}
				title="No Likely Trend Stations"
				selectedParameter={selectedParameter}
				onSelectStation={handleSelectStation}
				selectedStation={selectedStation}
				setShowCharts={setShowCharts}
			/>
		</div>
	);
}
