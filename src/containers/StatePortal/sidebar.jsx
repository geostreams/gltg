import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Language, PictureAsPdf, Map, Dashboard } from "@material-ui/icons";
import { sidebarConfig } from "./sidebarConfig";

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
		gridTemplateColumns: "1fr 1fr",
		gap: "20px",
	},
	card: {
		backgroundColor: "#eef3f8",
		borderRadius: "8px",
		padding: "15px",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between", // Space between title and icon
		height: "150px", // Adjust height to your preference
		position: "relative",
	},
	cardText: {
		fontSize: "1rem",
		fontWeight: "600",
		color: "#333",
		alignSelf: "flex-start", // Align title to the top-left
	},
	icon: {
		position: "absolute",
		bottom: "10px",
		right: "10px", // Icon aligned to the bottom-right
		fontSize: "40px",
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
					What information will you get?
				</Typography>
				<Typography variant="body2" color="primary" gutterBottom>
					Lorem ipsum dolor sit amet consectetur. Nulla tellus integer
					nisi fringilla facilisi ut ultrices. Malesuada ut faucibus
					lacus amet malesuada laoreet. Pellentesque sit nec dui id.
					Risus id lorem pellentesque bibendum tellus consequat turpis
					justo hac.
				</Typography>
			</Box>
		</>
	);

	const stateView = (selectedState) => {
		const getIcon = (fileType) => {
			switch (fileType) {
				case "web":
					return <Language style={styles.icon} />;
				case "dashboard":
					return <Dashboard style={styles.icon} />;
				case "map":
					return <Map style={styles.icon} />;
				case "pdf":
					return <PictureAsPdf style={styles.icon} />;
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
						<a
							key={index}
							href={resource.url}
							style={styles.card}
							target="_blank"
							rel="noopener noreferrer"
						>
							<p style={styles.cardText}>{resource.name}</p>
							{getIcon(resource.fileType)}
						</a>
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
