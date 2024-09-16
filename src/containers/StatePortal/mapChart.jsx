import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usStates from "us-atlas/states-10m.json"; // TopoJSON data for the U.S.

const highlightedStates = [
	"Minnesota",
	"Wisconsin",
	"Iowa",
	"Illinois",
	"Missouri",
	"Indiana",
	"Ohio",
	"Missouri",
	"Kentucky",
	"Arkansas",
	"Mississippi",
	"Louisiana",
];

const stateNameMarkers = [
	{ markerOffset: -20, name: "Minnesota", coordinates: [-94.6859, 46.7296] },
	{ markerOffset: -20, name: "Wisconsin", coordinates: [-89.9941, 44.7872] },
	{ markerOffset: -20, name: "Iowa", coordinates: [-93.2105, 41.8780] },
	{ markerOffset: -20, name: "Illinois", coordinates: [-89.3985, 40.6331] },
	{ markerOffset: -20, name: "Missouri", coordinates: [-92.3299, 38.5739] },
	{ markerOffset: -20, name: "Indiana", coordinates: [-86.1349, 40.2672] },
	{ markerOffset: -20, name: "Ohio", coordinates: [-82.9071, 40.4173] },
	{ markerOffset: -20, name: "Kentucky", coordinates: [-84.2700, 37.8393] },
	{ markerOffset: -20, name: "Arkansas", coordinates: [-92.2896, 34.7465] },
	{ markerOffset: -20, name: "Mississippi", coordinates: [-89.3985, 32.3547] },
	{ markerOffset: -20, name: "Louisiana", coordinates: [-91.8749, 30.9843] },
]

const MapChart = ({ onStateSelect }) => {
	// Function to handle clicking on a state
	const handleStateClick = (geo) => {
		const stateName = geo.properties.name;
		if (highlightedStates.includes(stateName)) {
			onStateSelect(stateName);
		}
	};

	return (
		<ComposableMap
			projection="geoAlbers"
			projectionConfig={{
				scale: 1600,
				center: [5, 38.7],
				rotate: [96, 0],
			}}
			style={{
				transform: "rotate(1deg)",
				width: "100%",
				height: "100%",
			}}
		>
			<Geographies geography={usStates}>
				{({ geographies }) =>
					geographies.map((geo) => {
						const isHighlighted = highlightedStates.includes(
							geo.properties.name,
						);
						return (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								onClick={() => handleStateClick(geo)}
								style={{
									default: {
										fill: isHighlighted
											? "#D6D6DA"
											: "#EAEAEC",
										outline: "none",
									},
									hover: {
										fill: isHighlighted ? "#F53" : "#AAA",
										outline: "none",
									},
									pressed: {
										fill: isHighlighted ? "#E42" : "#AAA",
										outline: "none",
									},
								}}
							/>
						);
					})
				}
			</Geographies>
			{/*Display state names*/}
			{stateNameMarkers.map(({ name, coordinates, markerOffset }) => (
				<g key={name}>
					<circle cx={coordinates[0]} cy={coordinates[1]} r={8} fill="#F00" />
					<text
						x={coordinates[0]}
						y={coordinates[1]}
						fontSize="12"
						textAnchor="middle"
						fill="#FFF"
						style={{ pointerEvents: "none" }}
					>
						<tspan x={coordinates[0]} dy={markerOffset}>
							{name}
						</tspan>
					</text>
				</g>
			))}

		</ComposableMap>
	);
};

export default MapChart;
