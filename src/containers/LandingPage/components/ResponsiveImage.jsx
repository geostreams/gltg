import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "inline-block",
	},
	image: {
		width: (props) => props.width || 400,
		maxHeight: (props) => props.height || 300,
		objectFit: "cover",
	},
	textContainer: {
		marginTop: theme.spacing(1),
		maxWidth: (props) => props.width || 400,
	},
	caption: {
		color: theme.palette.text.primary,
		fontSize: "0.875rem",
		lineHeight: 1.43,
		textAlign: "left",
	},
	credit: {
		color: theme.palette.text.secondary,
		fontSize: "0.75rem",
		fontStyle: "italic",
		textAlign: "left",
		marginTop: theme.spacing(0.5),
	},
}));

const ResponsiveImage = ({
	src = "/placeholder.jpg",
	alt = "Image description",
	width = 400,
	height = 300,
	caption = "Image caption",
	photoCredit = "Photo credit",
}) => {
	const classes = useStyles({ width, height });

	return (
		<Box className={classes.container}>
			<Box>
				<img src={src} alt={alt} className={classes.image} />
			</Box>
			<Box className={classes.textContainer}>
				<Typography component="div" variant="body2">
					{caption}
				</Typography>
				<Typography variant="caption">{photoCredit}</Typography>
			</Box>
		</Box>
	);
};

export default ResponsiveImage;
