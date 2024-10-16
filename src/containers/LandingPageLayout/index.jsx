// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

import Footer from "./Footer";
import Header, { HEADERS_HEIGHT } from "./Header";
import SmallHeader from "./SmallHeader";

const useStyles = makeStyles({
	scrim: {
		position: "absolute",
		background: "rgba(0, 0, 0, 0.5)",
		zIndex: 2000,
	},
	main: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: `calc(100% - ${HEADERS_HEIGHT}px)`,
		minWidth: "77em",
	},
});

type Props = {
	isLoading: boolean,
	extraMainClasses: string,
	children: React.Node,
	hasFooter: boolean,
	stickyFooter: boolean,
};

const Layout = ({
	isLoading,
	children,
	extraMainClasses,
	hasFooter,
	stickyFooter,
}: Props) => {
	const classes = useStyles();

	// Handle screen resizing
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	const widthBreakpoint = 1340;
	React.useEffect(() => {
		const handleResizeWindow = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResizeWindow);
		return () => {
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<Box
					className={`fillContainer ${classes.scrim}`}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<CircularProgress />
				</Box>
			) : null}
			{windowWidth > widthBreakpoint ? <Header /> : <SmallHeader />}
			<main className={`${classes.main} ${extraMainClasses}`}>
				{children}
				{hasFooter ? <Footer sticky={stickyFooter} /> : null}
			</main>
		</>
	);
};

Layout.defaultProps = {
	extraMainClasses: "",
	children: null,
	hasFooter: false,
	stickyFooter: false,
};

const mapStateToProps = (state) => ({
	isLoading: state.page.isLoading,
});

export default connect(mapStateToProps)(Layout);
