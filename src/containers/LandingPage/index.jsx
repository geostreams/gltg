// @flow
import React from "react";
import { Typography } from "@material-ui/core";

import About from "./components/about";
import TextBox from "./components/textbox";
import Imagerow from "./components/imagerow";
import FAQBox from "./components/faqbox";
import Datastories from "./components/datastories";
import Funding from "./components/funding";
import Partners from "./components/partners";
import RssFeed from "./components/rssfeed";
// Image URls
import SummaryDashboard from "./Images/SummaryDashboard.png";
import StatePortal from "./Images/StatePortal.png";
import ConservationPractices from "./Images/ConservationPractices.png";
import Explore from "./Images/Explore.png";
import Analyze from "./Images/Analyze.png";
import Download from "./Images/Download.png";
import HomeInfoSection from "./components/HomeInfoSection";

// Dashboard Images
import TrendDashboardImage from "./Images/trendDashboardImage.png";
import exploreDashboardImage from "./Images/exploreDashboardImage.png";

// Partner Images
import NGRREC from "./Images/Partners/NGREC.jpg";
import NCSA from "./Images/Partners/NCSA_logo.png";

// Funding Images
import WaltonFamily from "./Images/Partners/WaltonFamily.png";

const Home = () => {
	// Partner Links
	const partnerLink1 = "http://www.ngrrec.org/";
	const partnerLink2 = "https://www.ncsa.illinois.edu/";

	// Funding Links
	const fundLink1 = "https://www.waltonfamilyfoundation.org/";

	const trendsDashboardDataJson = JSON.stringify({
		label: "Background",
		content: [
			{ type: "heading", text: "What is this page about?" },
			{
				type: "paragraph",
				text: "To improve water quality in the MARB we must reduce the amount of nitrogen and phosphorus reaching the Mississippi River and its tributaries. However, it can take decades before the results of land  use changes become apparent. Long-term nutrient trends analyses help people visualize the outcomes of management practices and other factors, such as weather, that affect water quality.",
			},
			{ type: "heading", text: "What information will you get?" },
			{
				type: "paragraph",
				text: "This dashboard provides an overview of flow normalized nutrient data from water quality monitoring stations throughout the MARB. The  data is curated from the  Water Quality Portal (WQP), has been harmonized to be comparable across states, and the trends analysis was conducted using the WRTDs model..",
			},
			{ type: "heading", text: "Navigating the Dashboard" },
			{
				type: "paragraph",
				text: "Use the map to select a station/watershed to view concentration and load graphs corresponding to your chosen station.",
			},
		],
	});

	const stateEffortsDashboardDataJson = JSON.stringify({
		label: "Background",
		content: [
			{ type: "heading", text: "What is this page about?" },
			{
				type: "paragraph",
				text: "Collectively, the 12 Hypoxia Task Force (HTF) states are working to reduce concentrations of nutrients in our waterways to safeguard public health, improve the quality of drinking water, protect aquatic life and prevent harmful algal  blooms  as well as to reduce  the size of the Hypoxic Zone in the Gulf of Mexico.",
			},
			{ type: "heading", text: "What information will you get?" },
			{
				type: "paragraph",
				text: "Where available, we’ve provided the following information for each of the 12 HTF states:",
			},
			{
				type: "list",
				items: [
					"State Nutrient Loss Reduction Plan",
					"Nutrient Dashboards",
					"Nutrient Storymaps ",
				],
			},
			{ type: "heading", text: "Navigating the Dashboard" },
			{
				type: "paragraph",
				text: "Click on a state or use the dropdown menu to explore your state(s) of interest.",
			},
		],
	});

	const exploreDashboardJson = JSON.stringify({
		label: "Background",
		content: [
			{ type: "heading", text: "What is this page about?" },
			{
				type: "paragraph",
				text: "There are multiple organizations that collect water quality data in the MARB. If you are interested in water data from a particular location, this page can help you find it.",
			},
			{ type: "heading", text: "What information will you get?" },
			{
				type: "paragraph",
				text: "We present water quality data from:",
			},
			{
				type: "numberedList",
				items: [
					"EPA’s Water Quality Portal (WQP). This is nitrogen and phosphorus data only. We have done the work of curating the data for you so that you may more easily conduct your own analyses. The data is updated once a year.",
					"United States Geological Survey (USGS). This data provides multiple parameters of water quality such as dissolved oxygen, turbidity, water temperature, nutrient data, and more.",
					"USGS Super Gage Network. https://dashboard.waterdata.usgs.gov/app/nwd/en/  and provide info similar to : https://www.usgs.gov/centers/oki-water/science/super-gage-network  on the tab.",
					"Upper Mississippi River Restoration",
					"Fox River Study Group",
				],
			},
			{ type: "heading", text: "Navigating the Dashboard" },
			{
				type: "numberedList",
				items: [
					"Use the Monitoring Locations menu on the left of the screen to select the agency monitoring location of interest. The WQP data is the default. Click the circles to display the information for the other agencies.",
					"From the menu or map, click the location you are interested in to see water quality parameters collected at the site.",
					"Select View Data to explore charts and graphs.",
					"Use the Explore Layers menu on the right of the screen to see other available layers.",
				],
			},
		],
	});

	return (
		<>
			<About />
			<HomeInfoSection
				title="Nutrient Trends Dashboard"
				mapImage={TrendDashboardImage}
				launchButtonText="Launch Nutrient Trends Dashboard"
				infoJSON={trendsDashboardDataJson}
				buttonLink={"/nutrient-trends"}
			/>
			<HomeInfoSection
				title="State Efforts Dashboard"
				mapImage={TrendDashboardImage}
				launchButtonText="Launch State Efforts Dashboard"
				infoJSON={stateEffortsDashboardDataJson}
				buttonLink={"/nutrient-trends"}
			/>
			<HomeInfoSection
				title="Explore Water Quality Data Dashboard"
				mapImage={exploreDashboardImage}
				launchButtonText="Launch Explore Water Quality Data Dashboard"
				infoJSON={exploreDashboardJson}
				buttonLink={"/explore/all"}
			/>
			<RssFeed></RssFeed>
			<Partners
				partner1={NGRREC}
				partner2={NCSA}
				link1={partnerLink1}
				link2={partnerLink2}
			/>
			<Funding image1={WaltonFamily} link1={fundLink1} />
		</>
	);
};

export default Home;
