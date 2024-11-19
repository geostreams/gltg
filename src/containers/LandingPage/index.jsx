import React from "react";
import { Box, useTheme, useMediaQuery } from "@material-ui/core";
import About from "./components/about";
import Funding from "./components/funding";
import Partners from "./components/partners";
import HomeInfoSection from "./components/HomeInfoSection";

// Image URLS
import algaeBloomImage from "./Images/algae-bloom.jpg";
import samplingImage from "./Images/sampling-gltg.jpg";
import statePortal from "./Images/state-portal.jpg";

// Partner Images
import NGRREC from "./Images/Partners/NGREC.jpg";
import NCSA from "./Images/Partners/NCSA_logo.png";

// Funding Images
import WaltonFamily from "./Images/Partners/WaltonFamily.png";

const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// Partner Links
	const partnerLink1 = "http://www.ngrrec.org/";
	const partnerLink2 = "https://www.ncsa.illinois.edu/";

	// Funding Links
	const fundLink1 = "https://www.waltonfamilyfoundation.org/";

	const trendsDashboardDataJson = JSON.stringify({
		content: [
			{ type: "heading", text: "Why a Nutrient Trends Dashboard?" },
			{
				type: "paragraph",
				text: "To improve water quality in the MARB we must reduce the amount of nitrogen and phosphorus entering the streams and rivers flowing through the Mississippi River to the Gulf of Mexico. These changes take time. This is why we look at long term nutrient trends which can then be related to nutrient management practices.",
			},
			{ type: "heading", text: "What information will you get?" },
			{
				type: "paragraph",
				text: "The Nutrient Trends Dashboard provides information on concentrations and loads of nitrogen and phosphorus from over 200 sites having 20 years of data collection. The  data we used were taken  from the Water Quality Portal and  standardized to be comparable across states. Not all water quality monitoring sites met the criteria for our analysis which used the WRTDS method.",
			},
		],
	});

	const stateEffortsDashboardDataJson = JSON.stringify({
		content: [
			{ type: "heading", text: "Why a State Tracker Dashboard?" },
			{
				type: "paragraph",
				text: "The 12 Hypoxia Task Force (HTF) states are working to reduce concentrations of nutrients in our waterways to safeguard public health, improve the quality of drinking water, protect aquatic life and prevent harmful algal  blooms as well as to reduce  the size of the Hypoxic Zone in the Gulf of Mexico. \nThe 12 Hypoxia Task Force (HTF) states are working to reduce concentrations of nutrients in our waterways to safeguard public health, improve the quality of drinking water, protect aquatic life and prevent harmful algal  blooms as well as to reduce  the size of the Hypoxic Zone in the Gulf of Mexico.",
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
					"Additional Water Quality Resources",
					"Nutrient Storymaps ",
				],
			},
		],
	});

	const exploreDashboardJson = JSON.stringify({
		content: [
			{
				type: "heading",
				text: "Why an Explore Water Quality Data Dashboard?",
			},
			{
				type: "paragraph",
				text:
					"There are multiple organizations throughout the MARB that collect water quality data. We have focused on long term state and federal nutrient data contained in the  EPA/USGS Water Quality Portal, other USGS data on nutrients and flow, and several regional long term data sets." +
					"If you are interested in nutrients and related water quality data from a particular location or from a specific watershed, this page can help you find it.",
			},
		],
	});

	return (
		<Box sx={{ padding: isMobile ? 1 : 2 }}>
			<About />
			<HomeInfoSection
				title="Nutrient Trends Dashboard"
				infoImage={algaeBloomImage}
				imageCaption="Excess nutrients can cause algal blooms that degrade water quality."
				launchButtonText="Launch Nutrient Trends Dashboard"
				infoJSON={trendsDashboardDataJson}
				buttonLink="/nutrient-trends"
			/>
			<HomeInfoSection
				title="State Efforts Dashboard"
				infoImage={statePortal}
				imageCaption="Within the MARB, the 12 states participating in the Hypoxia Task Force are working to reduce nutrient pollution."
				launchButtonText="Launch State Efforts Dashboard"
				infoJSON={stateEffortsDashboardDataJson}
				buttonLink="/nutrient-trends"
			/>
			<HomeInfoSection
				title="Explore Water Quality Data Dashboard"
				infoImage={samplingImage}
				imageCaption="USGS scientists on the Mississippi River above Vicksburg use a D-99 sampler to collect sediment and water-quality samples from the large inland river."
				launchButtonText="Launch Explore Water Quality Data Dashboard"
				infoJSON={exploreDashboardJson}
				youtubeLink={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
				buttonLink="/explore/all"
			/>
			<Partners partner1={NGRREC} partner2={NCSA} link1={partnerLink1} link2={partnerLink2} />
			<HomeInfoSection
				title="State Efforts Dashboard"
				infoImage={AlgaeBloomImage}
				imageCaption="Within the MARB, the 12 states participating in the Hypoxia Task Force are working to reduce nutrient pollution."
				launchButtonText="Launch State Efforts Dashboard"
				infoJSON={stateEffortsDashboardDataJson}
				buttonLink="/nutrient-trends"
			/>
			<HomeInfoSection
				title="Explore Water Quality Data Dashboard"
				infoImage={samplingImage}
				imageCaption="USGS scientists on the Mississippi River above Vicksburg use a D-99 sampler to collect sediment and water-quality samples from the large inland river."
				launchButtonText="Launch Explore Water Quality Data Dashboard"
				infoJSON={exploreDashboardJson}
				youtubeLink={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
				buttonLink="/explore/all"
			/>
			<Partners partner1={NGRREC} partner2={NCSA} link1={partnerLink1} link2={partnerLink2} />
			<Funding image1={WaltonFamily} link1={fundLink1} />
		</Box>
	);
};

export default Home;
