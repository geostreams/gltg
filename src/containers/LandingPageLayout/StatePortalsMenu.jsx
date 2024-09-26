import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { Link } from "react-router-dom";

function StatePortalsMenu({
	anchorEl,
	open,
	onClose,
	classes,
	orientation = "right",
}) {
	const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
	const [currentSubMenu, setCurrentSubMenu] = useState(null);

	const statePortals = [
		{ name: "Illinois", link: "https://illinois.greatlakestogulf.org/" },
		{ name: "Missouri", link: "https://missouri.greatlakestogulf.org/" },
		{ name: "Arkansas", link: "https://arkansas.greatlakestogulf.org/" },
		{ name: "Tennessee", link: "https://tennessee.greatlakestogulf.org/" },
		{ name: "Indiana", hasSubMenu: true },
		{ name: "Iowa", hasSubMenu: true },
	];

	const submenuLinks = {
		Iowa: [
			{
				name: "AQuIA Monitoring Site Map",
				link: "https://programs.iowadnr.gov/aquia/search/map",
			},
			{
				name: "AQuIA Data Portal",
				link: "https://programs.iowadnr.gov/aquia/",
			},
		],
		Indiana: [
			{
				name: "Water Quality Trends",
				link: "https://storymaps.arcgis.com/stories/977fe35741c34a2b860b5702c797e020",
			},
			{
				name: "Sediment and Nutrient Trends",
				link: "https://gisdata.in.gov/portal/apps/experiencebuilder/experience/?id=a7a5365d78444f79bcddc1bbbf443d1a",
			},
		],
	};

	const handleSubMenuClose = () => {
		setSubMenuAnchorEl(null);
	};

	const handleSubMenuOptionClick = (link) => {
		window.location.href = link;
		handleSubMenuClose();
		onClose();
	};

	const handleMenuItemClick = (event, item) => {
		if (item.hasSubMenu) {
			setSubMenuAnchorEl(event.currentTarget);
			setCurrentSubMenu(item.name);
		} else if (item.link) {
			window.location.href = item.link;
			onClose();
		}
	};

	const isLeftOrientation = orientation === "left";

	return (
		<div>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: isLeftOrientation ? "left" : "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: isLeftOrientation ? "right" : "left",
				}}
			>
				{statePortals.map((item) => (
					<MenuItem
						key={item.name}
						onClick={(event) => handleMenuItemClick(event, item)}
						className={classes ? classes.menuItem : ""}
						component={
							item.link && item.link.startsWith("/")
								? Link
								: undefined
						}
						to={
							item.link && item.link.startsWith("/")
								? item.link
								: undefined
						}
					>
						{item.hasSubMenu && isLeftOrientation && (
							<ArrowLeftIcon />
						)}
						{item.name}
						{item.hasSubMenu && !isLeftOrientation && (
							<ArrowRightIcon />
						)}
					</MenuItem>
				))}
			</Menu>

			{/* Submenu for Indiana and Iowa */}
			<Menu
				anchorEl={subMenuAnchorEl}
				open={Boolean(subMenuAnchorEl)}
				onClose={handleSubMenuClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: isLeftOrientation ? "left" : "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: isLeftOrientation ? "right" : "left",
				}}
			>
				{currentSubMenu &&
					submenuLinks[currentSubMenu].map((subItem) => (
						<MenuItem
							key={subItem.name}
							onClick={() =>
								handleSubMenuOptionClick(subItem.link)
							}
						>
							{subItem.name}
						</MenuItem>
					))}
			</Menu>
		</div>
	);
}

export default StatePortalsMenu;
