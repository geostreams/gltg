// @flow
import React from "react";

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

// Partner Images
import NGRREC from "./Images/Partners/NGREC.jpg";
import NCSA from "./Images/Partners/NCSA_logo.png";

// Funding Images
import WaltonFamily from "./Images/Partners/WaltonFamily.png";

const Home = () => {
	// First Image Row Text
	const firstRowHeader1 = "Nutrient Trends Dashboard";
	const firstRowSubHeader1 =
		"Review all state portals in a single view. Current states available: Illinois. \n" +
		"\n" +
		"More to come!";
	const firstRowLink1 = "summary";
	const firstRowHeader2 = "State Portals";
	const firstRowSubHeader2 =
		"Review data and trends specific to individual states. Current states available: Illinois, Arkansas, Iowa. \n" +
		"\n" +
		"More to come!";
	const firstRowLink2 = "";
	const firstRowHeader3 = "Conservation Practices";
	const firstRowSubHeader3 =
		"Visualize the impact of water quality best management practices in this region.";
	const firstRowLink3 = "bmp";

	//State Links
	const illinois = "https://illinois.greatlakestogulf.org/";
	const arkansas = "https://arkansas.greatlakestogulf.org/";
	const iowa = "https://programs.iowadnr.gov/aquia/";
	const indiana =
		"https://storymaps.arcgis.com/stories/977fe35741c34a2b860b5702c797e020";
	const missouri = "https://missouri.greatlakestogulf.org/";
	const tennessee = "https://tennessee.greatlakestogulf.org/";
	// Second Image Row Text
	const secondRowHeader1 = "Explore";
	const secondRowSubHeader1 = "Explore water quality data";
	const secondRowLink1 = "explore/all";
	const secondRowHeader2 = "Analyze";
	const secondRowSubHeader2 = "Analyze water quality data";
	const secondRowLink2 = "analysis";
	const secondRowHeader3 = "Download";
	const secondRowSubHeader3 = "Download water quality data";
	const secondRowLink3 = "search";

	// Partner Links
	const partnerLink1 = "http://www.ngrrec.org/";
	const partnerLink2 = "https://www.ncsa.illinois.edu/";

	// Funding Links
	const fundLink1 = "https://www.waltonfamilyfoundation.org/";
	return (
		<>
			<About />
			<RssFeed></RssFeed>
			<TextBox
				title="Explore GLTG Dashboards"
				text="GLTG dashboards provide Mississippi River water quality analyses that have been developed by our team of experts. Take in the big picture at the Nutrient Trends Dashboard; review water quality state-by-state; and see the impact of a variety of best management practices on the river."
			/>
			<Imagerow
				image1={SummaryDashboard}
				image2={StatePortal}
				image3={ConservationPractices}
				header1={firstRowHeader1}
				header2={firstRowHeader2}
				header3={firstRowHeader3}
				subheader1={firstRowSubHeader1}
				subheader2={firstRowSubHeader2}
				subheader3={firstRowSubHeader3}
				link1={firstRowLink1}
				link2={firstRowLink2}
				link3={firstRowLink3}
				link4={illinois}
				link5={arkansas}
				link6={iowa}
				link7={indiana}
				link8={missouri}
				link9={tennessee}
			/>

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
