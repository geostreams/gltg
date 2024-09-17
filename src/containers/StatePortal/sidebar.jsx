import React, { useState } from "react";

const Sidebar = ({ selectedState }) => {
	return (
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
	);
};

export default Sidebar;
