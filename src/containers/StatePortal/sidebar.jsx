import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import { Language, Article, Map, Dashboard } from "@material-ui/icons";

import { sidebarConfig } from "./sidebarConfig";

// Styles for the sidebar layout
const styles = {
	sidebarContainer: {
		padding: "20px",
		backgroundColor: "#f4f4f4",
	},
	header: {
		fontSize: "1.5rem",
		marginBottom: "10px",
	},
	subHeader: {
		fontSize: "1rem",
		color: "#555",
		marginBottom: "20px",
	},
	sectionTitle: {
		fontSize: "1.2rem",
		marginBottom: "10px",
		fontWeight: "bold",
	},
	gridContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr", // 2 columns
		gap: "20px",
	},
	card: {
		backgroundColor: "#eef3f8",
		borderRadius: "8px",
		padding: "15px",
		textAlign: "center",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	},
	cardText: {
		marginTop: "10px",
		fontSize: "1rem",
		fontWeight: "600",
		color: "#333",
	},
};

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
					return <Language style={{ fontSize: 40 }} />;
				case "dashboard":
					return <Dashboard style={{ fontSize: 40 }} />;
				case "map":
					return <Map style={{ fontSize: 40 }} />;
				case "pdf":
					return <Article style={{ fontSize: 40 }} />;
				default:
					return null;
			}
		};

		const { header, subHeader, dataAndResources } =
			sidebarConfig[selectedState.toLowerCase()];

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
	};
	return (
		<div
			style={{
				width: "45%",
				padding: "20px",
				background: "#f4f4f4",
				overflowY: "auto",
			}}
		>
			{selectedState && sidebarConfig[selectedState.toLowerCase()]
				? stateView(selectedState)
				: defaultView}
		</div>
	);
};

export default Sidebar;
