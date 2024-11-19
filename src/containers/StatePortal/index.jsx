import React, { useState } from "react";
import MapChart from "./mapChart";
import Sidebar from "./sidebar";

const StatePortal = () => {
	const [selectedState, setSelectedState] = useState(null);

	const handleStateSelect = (stateName) => {
		setSelectedState(stateName);
	};

	return (
		<div style={{ display: "flex", width: "100vw", height: "100vh" }}>
			<div style={{ width: "55%", height: "100%" }}>
				<MapChart selectedState={selectedState} onStateSelect={handleStateSelect} />
			</div>
			<Sidebar selectedState={selectedState} onStateSelect={handleStateSelect} />
		</div>
	);
};

export default StatePortal;
