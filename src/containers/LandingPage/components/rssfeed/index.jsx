import React, { useState, useEffect } from "react";
import {
  CardActions,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import classes from "./index.css";

function RssFeed() {
  const [feedItems, setFeedItems] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch("https://greatlakestogulf.web.illinois.edu/feed")
      .then((response) => response.text())
      .then((xml) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");

        const items = doc.querySelectorAll("item");
        const channel = doc.querySelectorAll("channel");
        const feedItems = Array.from(items).map((item) => ({
          title: item.querySelector("title").textContent,
          link: item.querySelector("link").textContent,
          pubDate: item.querySelector("pubDate").textContent,
          author: item.querySelector("creator").textContent,
          description: item.querySelector("description").textContent,
        }));
        feedItems.forEach((item) => {
          const text = item.description;
          const imgPattern = /<img\s+([^>]*src="([^"]+)"[^>]*)>/g;
          const imageTags = [];
          let match;
          while ((match = imgPattern.exec(text)) !== null) {
            const imgTag = match[1];
            const src = match[2] ? match[2] : null;
            const altMatch = imgTag.match(/alt="([^"]+)"/);
            const widthMatch = imgTag.match(/width="([^"]+)"/);
            const heightMatch = imgTag.match(/height="([^"]+)"/);
            const alt = altMatch ? altMatch[1] : null;
            const width = widthMatch ? parseInt(widthMatch[1]) : null;
            const height = heightMatch ? parseInt(heightMatch[1]) : null;
            imageTags.push({
              src: src,
              alt: alt,
              width: width,
              height: height,
            });
          }
          item["image"] = imageTags;
          console.log(item);
          const strippedText = item.description.replace(/(<([^>]+)>)/gi, "");
          item["description"] = strippedText;
          var pubDate = item["pubDate"];
          const dateString = pubDate;
          const monthAbbreviations = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          // split the date string into an array of its components
          const dateComponents = dateString.split(" ");

          // extract the month abbreviation, day and year from the components
          const monthAbbreviation = dateComponents[2];
          const day = dateComponents[1];
          const year = dateComponents[3];

          // find the index of the month abbreviation in the array of month abbreviations
          const monthIndex = monthAbbreviations.indexOf(monthAbbreviation);
          // use the month index to get the full month name
          const monthName =
            monthIndex !== -1 ? monthAbbreviations[monthIndex] : "";

          const formattedDate = `${monthName} ${day},${year}`;
          item["pubDate"] = formattedDate;
          var desc = item["description"];
          if(desc.length + (item["title"]).length>50){
              desc = desc.substring(0,153);
              item["description"] = desc +"......";
          }
        });

        setFeedItems(feedItems);
      });
  }, ["https://greatlakestogulf.web.illinois.edu/feed"]);

  return (
    <>
      <div>
        <h1 className={classes.textTitle}>GLTG News</h1>
        <Grid container spacing={2}>
          {feedItems.map((card, index) => (
            <Grid key={index} item xs={1} sm={1} md={4} style={{ height: 550 }}>
              <Card style={{ height: 550 }}>
                <CardMedia
                  style={{
                    height: "300px",
                    objectFit: "cover",
                  }}
                  component="img"
                  image={card["image"][0]["src"]}
                  alt={card.title}
                  width={card["image"][0]["width"]}
                />
                <CardContent style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {card.pubDate}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small"> <Link
                  href={card.link}
                  color="inherit"
                  underline="none"
                  style={{ marginBottom: "1em" }}
                >
                  Learn More
                </Link></Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid container justify="center" align="center">
            <Grid item>
              <Button
                variant="outlined"
                align="centre"
                color="primary"
                style={{ marginBottom: "2em",marginTop: "1em" }}
              >
                <Link
                  href="https://greatlakestogulf.web.illinois.edu/"
                  color="inherit"
                  underline="none"
                >
                  More News{" "}
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default RssFeed;
