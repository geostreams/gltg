import React from "react";
import { Box, makeStyles } from "@material-ui/core";
// ImageContainer.js
const useStyles = makeStyles(() => ({
	container: {
		width: (props) => props.width || "70%",
		height: (props) => props.height || "250px",
		backgroundColor: (props) => props.backgroundColor || "#fff",
		borderRadius: (props) => props.borderRadius || "8px",
		margin: "0 auto",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "contain", // Makes image fit while maintaining aspect ratio
		objectPosition: "center",
	},
}));

const ImageContainer = ({ src, alt = "", width, height, backgroundColor, borderRadius, className, ...props }) => {
	const classes = useStyles({
		width,
		height,
		backgroundColor,
		borderRadius,
	});

	return (
		<Box className={`${classes.container} ${className || ""}`}>
			<img src={src} alt={alt} className={classes.image} {...props} />
		</Box>
	);
};

export default ImageContainer;
