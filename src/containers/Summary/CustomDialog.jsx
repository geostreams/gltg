import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	IconButton,
	FormControlLabel,
	Checkbox,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	dialogCloseButton: {
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(1),
	},
	checkboxContainer: {
		marginTop: theme.spacing(2),
		display: "flex",
		alignItems: "center",
	},
}));

const CustomDialog = ({
	open,
	onClose,
	title,
	children,
	cookieId = "default-dialog",
	classes: parentClasses = {},
	maxWidth = false,
}) => {
	const classes = useStyles();
	const [dontShowAgain, setDontShowAgain] = React.useState(false);

	React.useEffect(() => {
		// Check if "don't show again" cookie exists
		const shouldHide = document.cookie.split("; ").find((row) => row.startsWith(`${cookieId}=`));

		if (shouldHide) {
			onClose();
		}
	}, [cookieId, onClose]);

	const handleClose = () => {
		if (dontShowAgain) {
			// Set cookie to expire in 365 days
			const expiryDate = new Date();
			expiryDate.setDate(expiryDate.getDate() + 365);
			document.cookie = `${cookieId}=true; expires=${expiryDate.toUTCString()}; path=/`;
		}
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			classes={{
				paper: parentClasses.paper,
			}}
		>
			<DialogTitle>
				{title}
				<IconButton className={classes.dialogCloseButton} onClick={handleClose}>
					<Clear />
				</IconButton>
			</DialogTitle>

			<DialogContent className={parentClasses.content}>
				<DialogContentText>
					{children}
					<div className={classes.checkboxContainer}>
						<FormControlLabel
							control={
								<Checkbox
									checked={dontShowAgain}
									onChange={(e) => setDontShowAgain(e.target.checked)}
									color="primary"
								/>
							}
							label="Don't show this message again"
						/>
					</div>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};

export default CustomDialog;
