import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import {sidebarConfig} from "./sidebarConfig";

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

	const stateView = (selectedState) => {

		const getIcon = (fileType) => {
			switch (fileType) {
				case "web":
					return <FaGlobe size={40} />;
				case "dashboard":
					return <FaThLarge size={40} />;
				case "map":
					return <FaMap size={40} />;
				default:
					return null;
			}
		};

		const { header, subHeader, dataAndResources } = sidebarConfig[selectedState];

		return (
			<div style={styles.sidebarContainer}>
				<h1 style={styles.header}>{header}</h1>
				<p style={styles.subHeader}>{subHeader}</p>
				<h2 style={styles.sectionTitle}>Data and Resources</h2>
				<div style={styles.gridContainer}>
					{dataAndResources.map((resource, index) => (
						<div key={index} style={styles.card}>
							{getIcon(resource.fileType)}
							<p style={styles.cardText}>{resource.name}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
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
				stateView(selectedState)
			) : (
				defaultView
			)}
		</div>
	);
};

export default Sidebar;
