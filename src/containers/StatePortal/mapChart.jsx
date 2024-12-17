import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import usStates from "us-atlas/states-10m.json";

const highlightedStates = [
	"Minnesota",
	"Wisconsin",
	"Iowa",
	"Illinois",
	"Missouri",
	"Indiana",
	"Ohio",
	"Kentucky",
	"Arkansas",
	"Mississippi",
	"Tennessee",
	"Louisiana",
];

// Define custom colors for each state
const stateColors = {
	Minnesota: "#9BE4FF",
	Wisconsin: "#E1D7FF",
	Iowa: "#E0FAFC",
	Illinois: "#FFC8A0",
	Missouri: "#89DC8D",
	Indiana: "#FBC9D4",
	Ohio: "#90A9FF",
	Kentucky: "#B2C379",
	Arkansas: "#C69FE8",
	Mississippi: "#83C6CE",
	Tennessee: "#FFEFD7",
	Louisiana: "#E2FFD2",
};

// Manually specifying positions for state labels (x, y coordinates)
const stateNameMarkers = [
	{ name: "Minnesota", coordinates: [-94.6859, 46.5296] },
	{ name: "Wisconsin", coordinates: [-89.9941, 44.7872] },
	{ name: "Iowa", coordinates: [-93.2105, 41.878] },
	{ name: "Illinois", coordinates: [-89.3985, 40.6331] },
	{ name: "Missouri", coordinates: [-92.2299, 38.3739] },
	{ name: "Indiana", coordinates: [-86.1349, 40.2672] },
	{ name: "Ohio", coordinates: [-82.9071, 40.4173] },
	{ name: "Kentucky", coordinates: [-84.87, 37.4393] },
	{ name: "Arkansas", coordinates: [-92.2896, 34.7465] },
	{ name: "Mississippi", coordinates: [-89.6985, 32.3547] },
	{ name: "Louisiana", coordinates: [-91.8749, 30.5843] },
	{ name: "Tennessee", coordinates: [-86.6602, 35.6035] },
];

const MapChart = ({ selectedState, onStateSelect }) => {
	const handleStateClick = (geo, event) => {
		event.stopPropagation();
		const stateName = geo.properties.name;

		if (highlightedStates.includes(stateName)) {
			if (selectedState === stateName) {
				onStateSelect(null);
			} else {
				onStateSelect(stateName);
			}
		} else {
			onStateSelect(null);
		}
	};

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<ComposableMap
				projection="geoAlbers"
				projectionConfig={{
					scale: 1600,
					center: [5, 38.7],
					rotate: [96, 0],
				}}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<Geographies geography={usStates}>
					{({ geographies }) =>
						geographies.map((geo) => {
							const stateName = geo.properties.name;
							const isHighlighted = highlightedStates.includes(stateName);

							const borderStyle = isHighlighted && selectedState !== stateName ? "dashed" : "solid";

							const fillColor = selectedState
								? selectedState === stateName
									? stateColors[stateName]
									: "#EAEAEC"
								: stateColors[stateName] || "#D6D6DA";

							return (
								<g key={geo.rsmKey}>
									<Geography
										geography={geo}
										onClick={(event) => handleStateClick(geo, event)}
										style={{
											default: {
												fill: isHighlighted ? fillColor : "#EAEAEC",
												outline: "none",
												stroke: isHighlighted ? "#000" : "none",
												strokeWidth: 1.5,
												strokeDasharray: borderStyle === "dashed" ? "5,5" : "none",
											},
											hover: {
												fill: isHighlighted ? fillColor : "#D6D6DA",
												outline: "none",
												stroke: isHighlighted ? "#000" : "none",
												strokeWidth: 2,
												strokeDasharray: "none",
											},
											pressed: {
												fill: fillColor,
												outline: "none",
												stroke: isHighlighted ? "#000" : "none",
												strokeWidth: 2,
												strokeDasharray: "none",
											},
										}}
									/>
								</g>
							);
						})
					}
				</Geographies>
				{stateNameMarkers.map(({ name, coordinates, markerOffset }) => (
					<Marker key={name} coordinates={coordinates}>
						<text
							textAnchor="middle"
							style={{
								fontSize: "0.7em",
								fill: "black",
							}}
							// Without this, clicking on the text will not trigger the state click
							onClick={(event) => {
								// Prevents event bubbling and ensures the label behaves like the state click
								event.stopPropagation();
								onStateSelect((prevSelected) => (prevSelected === name ? null : name));
							}}
							dy={markerOffset}
						>
							{name}
						</text>
					</Marker>
				))}
			</ComposableMap>
		</div>
	);
};

export default MapChart;
