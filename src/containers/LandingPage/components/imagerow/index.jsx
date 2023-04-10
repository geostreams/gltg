import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./index.css";
import { Stack } from "@material-ui/core";
import { Button, MenuItem, Menu, Popover, MenuList } from "@material-ui/core";
const ImageRow = (props) => {
  const history = useHistory();

  const {
    image1,
    image2,
    image3,
    header1,
    header2,
    header3,
    subheader1,
    subheader2,
    subheader3,
    link1,
    link2,
    link3,
    link4,
    link5,
    link6,
    link7,
  } = props;
  const [image1Hover, setImage1Hover] = React.useState(false);
  const [image2Hover, setImage2Hover] = React.useState(false);
  const [image3Hover, setImage3Hover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.row}>
      <div
        className={classes.column}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          cursor: "pointer",
        }}
        onMouseEnter={() => setImage1Hover(true)}
        onMouseLeave={() => setImage1Hover(false)}
        onClick={() => history.push(link1)}
      >
        <div
          className={classes.topLeft}
          style={{ margin: "1em 0em 0em 0em", padding: "0.5em" }}
        >
          <h2 className={classes.header}> {header1}</h2>
        </div>
        <div
          className={classes.subHeadingtopLeft}
          style={{ margin: "1em 0em 1em", padding: "0.5em" }}
        >
          <p className={classes.descriptionText}> {subheader1}</p>
        </div>
      </div>
      <div
        className={classes.column}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          cursor: "pointer",
        }}
        onMouseEnter={() => setImage2Hover(true)}
        onMouseLeave={() => setImage2Hover(false)}
        onClick={(e) => {
          history.push(link2);
        }}
      >
        <div
          className={classes.topLeft}
          style={{
            margin: "1em 0em 0em 0em",
            padding: "0.5em 0.5em 0em 0.5em",
          }}
        >
          <h2 className={classes.header}> {header2}</h2>
        </div>
        <div
          className={classes.subHeadingtopLeft}
          style={{ margin: "1em 0em 1em", padding: "0.5em 0.5em 0em 0.5em" }}
        >
          <p className={classes.descriptionText}> {subheader2}</p>
        </div>

        {header2 == "State Portals" ? (
          <>
            <div style={{ margin: "0em 0em 4em 0em" }}>
              <a href={link4}>
                <Button
                  variant="contained"
                  style={{ color: "black", margin: "11em 0.5em 4em 2em" }}
                >
                  Illinois
                </Button>
              </a>

              <Button
                variant="contained"
                style={{ color: "black", margin: "11em 0em 4em 2em" }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {" "}
                Iowa
              </Button>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuList>
                    <a href="https://programs.iowadnr.gov/aquia/search/map">
                        <MenuItem>AQuIA Monitoring Site Map</MenuItem>
                    </a>
                    <a href="https://programs.iowadnr.gov/aquia/">
                        <MenuItem>AQuIA Data Portal</MenuItem>
                    </a>
                </MenuList>
              </Popover>

              <a href={link5}>
                <Button
                  variant="contained"
                  style={{ color: "black", margin: "11em 0em 4em 2em" }}
                >
                  {" "}
                  Arkansas
                </Button>
              </a>
                
              <a href={link7}>
                <Button
                  variant="contained"
                  style={{ color: "black", margin: "11em 0em 4em 2em" }}
                >
                  {" "}
                  Indiana
                </Button>
              </a>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={classes.column}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url(${image3})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          cursor: "pointer",
        }}
        onMouseEnter={() => setImage3Hover(true)}
        onMouseLeave={() => setImage3Hover(false)}
        onClick={() => history.push(link3)}
      >
        <div
          className={classes.topLeft}
          style={{
            margin: "1em 0em 0em 0em",
            padding: "0.5em 0.5em 0em 0.5em",
          }}
        >
          <h2 className={classes.header}> {header3}</h2>
        </div>
        <div
          className={classes.subHeadingtopLeft}
          style={{ margin: "1em 0em 1em", padding: "0.5em 0.5em 0em 0.5em" }}
        >
          <p className={classes.descriptionText}> {subheader3}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageRow;
