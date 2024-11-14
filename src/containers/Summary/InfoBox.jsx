import React, { useState } from "react";
import {
	Typography,
	Tabs,
	Tab,
	List,
	ListItem,
	ListItemText,
	makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	tabContent: {
		padding: theme.spacing(2),
		overflow: "auto",
		flex: 1,
	},
	contentSection: {
		marginBottom: theme.spacing(2),
	},
	listItem: {
		display: "list-item",
		listStyleType: "disc",
		marginLeft: theme.spacing(2),
	},
	numberedListItem: {
		display: "list-item",
		listStyleType: "decimal",
		marginLeft: theme.spacing(2),
	},
}));

const InfoBox = ({ dashboardData }) => {
	const classes = useStyles();
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const renderContent = (item) => {
		switch (item.type) {
			case "paragraph":
				return <Typography paragraph>{item.text}</Typography>;
			case "heading":
				return (
					<Typography variant="h6" gutterBottom>
						{item.text}
					</Typography>
				);
			case "list":
				return (
					<List>
						{item.items.map((listItem, index) => (
							<ListItem key={index} className={classes.listItem}>
								<ListItemText primary={listItem} />
							</ListItem>
						))}
					</List>
				);
			case "numberedList":
				return (
					<List>
						{item.items.map((listItem, index) => (
							<ListItem
								key={index}
								className={classes.numberedListItem}
							>
								<ListItemText primary={listItem} />
							</ListItem>
						))}
					</List>
				);
			default:
				return null;
		}
	};

	const ContentRenderer = ({ content }) => {
		return (
			<>
				{content.map((item, index) => (
					<div key={index} className={classes.contentSection}>
						{renderContent(item)}
					</div>
				))}
			</>
		);
	};

	return (
		<div className={classes.root}>
			{dashboardData.length > 1 && (
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					variant="scrollable"
				>
					{dashboardData.map((tab, index) => (
						<Tab key={index} label={tab.label} />
					))}
				</Tabs>
			)}

			<div className={classes.tabContent}>
				<ContentRenderer content={dashboardData[activeTab].content} />
			</div>
		</div>
	);
};

export default InfoBox;
