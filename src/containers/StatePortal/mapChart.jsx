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
		</ComposableMap>
	);
};

export default MapChart;
