const SummaryInfo = [
	{
		label: "TREND SITES",
		content: [
			{
				type: "heading",
				text: "How did we select our trend sites?",
			},
			{
				type: "paragraph",
				text: "Data from thousands of water monitoring stations were downloaded from the Water Quality Portal. We performed data harmonization and in-depth screening of paired nitrate-N and total phosphorus concentration and streamflow monitoring gauges. As a result, we had a robust dataset of 217 sites having nitrate records for over 70% of the period and full coverage of streamflow records was obtained. Flow normalized total phosphorus concentration and yield trends were calculated for 132 watersheds. ",
			},
		],
	},
	{
		label: "CONCENTRATION",
		content: [
			{
				type: "heading",
				text: "What is concentration?",
			},
			{
				type: "paragraph",
				text: "Concentration is the amount of a nutrient in a defined volume of water at a given sample location when the sample was collected.",
			},
		],
	},
	{
		label: "LOAD",
		content: [
			{
				type: "heading",
				text: "What is nutrient load?",
			},
			{
				type: "paragraph",
				text: "Load is the quantity of a nutrient in pounds or tons flowing down a river within a certain period of time. Larger loads can have larger impacts on downstream water bodies such as lakes, reservoirs and estuaries.  Load is the product of concentration and flow and is expressed in pounds or tons of nutrient per day, month or year.  Flow is generally measured on a daily basis while concentrations are often measured on a monthly or quarterly basis.",
			},
		],
	},
	{
		label: "FLOW NORMALIZED LOAD",
		content: [
			{
				type: "heading",
				text: "What is flow normalized load?",
			},
			{
				type: "paragraph",
				text: "Flow normalized load estimates nutrient loads while minimizing the effects of streamflow driven by the variability in precipitation from year to year.",
			},
			{
				type: "paragraph",
				text: 'On an annual basis, river water flows and nutrient loads are highly variable due to the variability of precipitation quantity and seasonally.  Flow normalization attempts to statistically estimate nutrient loads that were expected to have occurred if the flow had been "normal", and two different definitions of "normal" are used.',
			},
			{
				type: "paragraph",
				text: "One definition of normal assumes average flows are stationary and uses average flows over the entire period of observation. Changes in flow normalized load under the stationary flow assumption are thought to represent all factors contributing to change including changes in long term average streamflow.",
			},
			{
				type: "paragraph",
				text: "A second definition of normal uses a 15 year moving window of flows to estimate expected loads at normal flow within each 15 year window, which reduces the influence of long-term changes in stream flow on loads and therefore better reflects changes due to other factors such as land cover, wastewater, agricultural practices, which we call the nutrient supply component. The difference between the flow normalized loads from non-stationary flow and stationary flow assumptions is considered the stream flow component of flow normalized load change.",
			},
			{
				type: "paragraph",
				text: 'Both versions of flow normalization should be understood as statistical estimates of hypothetically "normal" conditions that rarely exist in the short term (~1-3 years), but may be useful to approximate relative influence of changes in flow from other factors over longer terms (~5 - 10 years).',
			},
		],
	},
	{
		label: "NUTRIENT YIELD",
		content: [
			{
				type: "heading",
				text: "What is nutrient yield?",
			},
			{
				type: "paragraph",
				text: "Larger rivers typically have larger loads than smaller rivers partly because of the size of the watershed area draining to the river monitoring location. To better compare loads from small and large watersheds, the load can be divided by the watershed drainage area, and the result is called yield.  It is generally expressed as pounds or tons of nutrient per acre or square mile over a specified time period.",
			},
			{
				type: "paragraph",
				text: 'For example (with approximate values), the annual nitrate-N loads for the Mississippi River at Thebes, Illinois averages about 1,100 million lb N per year, which is much larger than the 16.5 million lb N per year load for the much smaller Vermilion River at Leonore, IL.  But dividing these loads by their respective drainage areas results in 2.4 lb N per acre each year for the Mississippi River at Thebes compared to 20 lb N per acre each year for the Vermilion River.  The high nitrate-N yield for the Vermilion River identifies it as relative "hot spot" contributing more N per unit area than most of the rest of the upper Mississippi River Basin and thus may be a watershed where focused conservation efforts could potentially reduce nitrate loads more cost effectively than areas with lower nitrate yields. ',
			},
		],
	},
];

export default SummaryInfo;
