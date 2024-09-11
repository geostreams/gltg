import React, { useState } from "react";
import MapChart from "./mapChart";

const StatePortal = () => {
	const [selectedState, setSelectedState] = useState(null);

	const handleStateSelect = (stateName) => {
		setSelectedState(stateName);
	};

	return (
		<div style={{ display: "flex", width: "100vw", height: "100vh" }}>
			<div style={{ width: "55%", height: "100%" }}>
				<MapChart onStateSelect={handleStateSelect} />
			</div>
			<div
				style={{
					width: "45%",
					padding: "20px",
					background: "#f4f4f4",
					overflowY: "auto",
				}}
			>
				{selectedState ? (
					<div>
						<h2>{selectedState}</h2>
						<p>Details about {selectedState}...</p>
					</div>
				) : (
					<p>Select a state to see details</p>
				)}
			</div>
		</div>
	);
};

export default StatePortal;
