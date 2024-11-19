// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

import Footer from "./Footer";
import Header, { HEADERS_HEIGHT } from "./Header";
import SmallHeader from "./SmallHeader";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	scrim: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "rgba(0, 0, 0, 0.5)",
		zIndex: 2000,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	headerContainer: {
		position: "sticky",
		top: 0,
		zIndex: 1000,
		backgroundColor: "white",
		height: HEADERS_HEIGHT,
	},
	mainContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		minHeight: `calc(100vh - ${HEADERS_HEIGHT}px)`,
	},
	content: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		minHeight: 0,
		overflow: "hidden",
	},
	footerContainer: {
		marginTop: "auto",
	},
	stickyFooter: {
		position: "sticky",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1000,
		backgroundColor: "white",
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
		<div className={classes.root}>
			{isLoading && (
				<div className={classes.scrim}>
					<CircularProgress />
				</div>
			)}

			<div className={classes.headerContainer}>
				{windowWidth > widthBreakpoint ? <Header /> : <SmallHeader />}
			</div>

			<div className={classes.mainContainer}>
				<div className={`${classes.content} ${extraMainClasses}`}>
					{children}
				</div>

				{hasFooter && (
					<div
						className={`${classes.footerContainer} ${stickyFooter ? classes.stickyFooter : ""}`}
					>
						<Footer sticky={stickyFooter} />
					</div>
				)}
			</div>
		</div>
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
