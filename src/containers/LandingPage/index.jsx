// @flow
import React from 'react';

import About from './components/about';
import TextBox from './components/textbox';
import Imagerow from './components/imagerow';
import FAQBox from './components/faqbox';
import Datastories from './components/datastories';
import Funding from './components/funding';
import Partners from './components/partners';

// Image URls
import SummaryDashboard from './Images/SummaryDashboard.png';
import StatePortal from './Images/StatePortal.png';
import ConservationPractices from './Images/ConservationPractices.png';
import Explore from './Images/Explore.png';
import Analyze from './Images/Analyze.png';
import Download from './Images/Download.png';

// Partner Images
import NGRREC from './Images/Partners/NGREC.jpg';
import NCSA from './Images/Partners/NCSA_logo.png';

// Funding Images
import WaltonFamily from './Images/Partners/WaltonFamily.png';

const Home = () => {

    // First Image Row Text
    const firstRowHeader1 = 'Summary Dashboard';
    const firstRowSubHeader1 = 'Review all state portals in a single view. Current states available: Illinois. \n' +
        '\n' +
        'More to come!';
    const firstRowLink1 = 'summary';
    const firstRowHeader2 = 'State Portals';
    const firstRowSubHeader2 = 'Review data and trends specific to individual states. Current states available: Illinois. \n' +
                                '\n' +
                                'More to come!';
    const firstRowLink2 = 'summary';
    const firstRowHeader3 = 'Conservation Practices';
    const firstRowSubHeader3 = 'Visualize the impact of water quality best management practices in this region.';
    const firstRowLink3 = 'bmp';
    // Second Image Row Text
    const secondRowHeader1 = 'Explore';
    const secondRowSubHeader1 = 'Explore water quality data';
    const secondRowLink1 = 'explore/all';
    const secondRowHeader2 = 'Analyze';
    const secondRowSubHeader2 = 'Analyze water quality data';
    const secondRowLink2 = 'analysis';
    const secondRowHeader3 = 'Download';
    const secondRowSubHeader3 = 'Download water quality data';
    const secondRowLink3 = 'search';

    // Partner Links
    const partnerLink1 = 'http://www.ngrrec.org/';
    const partnerLink2 = 'https://www.ncsa.illinois.edu/';

    // Funding Links
    const fundLink1 = 'https://www.waltonfamilyfoundation.org/';
    return (
        <>
            <About />
            <TextBox title = 'Explore GLTG Dashboards' text = 'GLTG dashboards provide Mississippi River water quality analyses that have been developed by our team of experts. Take in the big picture at the summary dashboard; review water quality state-by-state; and see the impact of a variety of best management practices on the river.' />
            <Imagerow image1 = {SummaryDashboard} image2 = {StatePortal} image3 ={ConservationPractices}
                header1={firstRowHeader1} header2={firstRowHeader2} header3 = {firstRowHeader3}
                subheader1={firstRowSubHeader1} subheader2={firstRowSubHeader2} subheader3={firstRowSubHeader3}
                link1={firstRowLink1} link2={firstRowLink2} link3={firstRowLink3} />
            <TextBox title = 'Explore GeoStreaming Dashboards' text = 'GLTG is built on Geodashboards, an open-source web technology that lets users interact with and visualize geospatial data. Use the dashboards below to explore, download, and perform your own analysis on water quality data from across the Mississippi River watershed.' />
            <Imagerow image1 = {Explore} image2 = {Analyze} image3 ={Download}
                header1={secondRowHeader1} header2={secondRowHeader2} header3 = {secondRowHeader3}
                subheader1={secondRowSubHeader1} subheader2={secondRowSubHeader2} subheader3={secondRowSubHeader3}
                link1={secondRowLink1} link2={secondRowLink2} link3={secondRowLink3} />
            <FAQBox title = 'FAQ' text = 'Learn more about how to use this site.' />
            <Datastories />
            <Partners partner1 = {NGRREC} partner2 = {NCSA} link1={partnerLink1} link2={partnerLink2} />
            <Funding image1 = {WaltonFamily} link1={fundLink1} />
        </>);
};

export default Home;
