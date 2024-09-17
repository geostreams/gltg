import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";

const Sidebar = ({ selectedState }) => {
	const defaultView = (
		<>
			<Box mb={3}>
				<Typography variant="subtitle2" color="primary" gutterBottom>
					What is this page about?
				</Typography>
				<Typography variant="body2" color="primary" gutterBottom>
					Lorem ipsum dolor sit amet consectetur. Nulla tellus integer
					nisi fringilla facilisi ut ultrices. Malesuada ut faucibus
					lacus amet malesuada laoreet. Pellentesque sit nec dui id.
					Risus id lorem pellentesque bibendum tellus consequat turpis
					justo hac.
				</Typography>
			</Box>
			<Box>
				<Typography variant="subtitle2" color="primary" gutterBottom>
					What information will you get ?
				</Typography>
				<Typography variant="body2" color="primary" gutterBottom>
					Lorem ipsum dolor sit amet consectetur. Nulla tellus integer
					nisi fringilla facilisi ut ultrices. Malesuada ut faucibus
					lacus amet malesuada laoreet. Pellentesque sit nec dui id.
					Risus id lorem pellentesque bibendum tellus consequat turpis
					justo hac.{" "}
				</Typography>
			</Box>
		</>
	);
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
				defaultView
			)}
		</div>
	);
};

export default Sidebar;
