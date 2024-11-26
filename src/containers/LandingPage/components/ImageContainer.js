import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	wrapper: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		marginBottom: "20px",
		alignItems: "center",
	},
	contentWrapper: {
		width: (props) => props.width || "100%",
		maxWidth: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	imageBox: {
		width: "100%",
		height: (props) => props.height || "250px",
		backgroundColor: (props) => props.backgroundColor || "#fff",
		borderRadius: (props) => props.borderRadius || "8px",
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		maxHeight: "100%",
		maxWidth: "100%",
		objectFit: "contain",
		display: "block",
	},
	textBox: {
		width: "100%",
		marginTop: "8px",
	},
	caption: {
		fontSize: "14px",
		color: "#000",
		lineHeight: 1.2,
		"& a": {
			color: "#0000EE",
			textDecoration: "none",
			"&:hover": {
				textDecoration: "underline",
			},
		},
	},
	credit: {
		fontSize: "14px",
		color: "#666",
		lineHeight: 1.2,
		marginTop: "4px",
		"& a": {
			color: "#0000EE",
			textDecoration: "none",
			"&:hover": {
				textDecoration: "underline",
			},
		},
	},
}));

const ImageContainer = ({
	src,
	alt = "",
	width,
	height,
	backgroundColor,
	borderRadius,
	className,
	caption,
	photoCredit,
	...props
}) => {
	const classes = useStyles({
		width,
		height,
		backgroundColor,
		borderRadius,
	});

	return (
		<Box className={classes.wrapper}>
			<Box className={classes.contentWrapper}>
				<Box className={`${classes.imageBox} ${className || ""}`}>
					<img src={src} alt={alt} className={classes.image} {...props} />
				</Box>
				{(caption || photoCredit) && (
					<Box className={classes.textBox}>
						{caption && <Typography className={classes.caption}>{caption}</Typography>}
						{photoCredit && <Typography className={classes.credit}>Photo: {photoCredit}</Typography>}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default ImageContainer;
