import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import HomePageCard from "./HomePageCard";

const cardsData = [
  {
    title: "Meet the Women Leading the Way",
    description:
      "Be inspired by women who are excelling in their fields, breaking boundaries, and showing the next generation what’s possible.",
    image:
      "https://engineering.fb.com/wp-content/uploads/2015/06/gdg4qacpcgcsgsccadrpyhqaaaaabj0jaaab.jpg",
    link: "/role-models", // External link
  },
  {
    title: "Get Involved",
    description:
      "We believe in fostering a supportive and inclusive environment for women in engineering.",
    image:
      "https://www.auckland.ac.nz/content/auckland/en/engineering/study-with-us/women-in-engineering/jcr:content/par/linkspagetemplategri_559213939/par2/subflexicomponentlin/image.img.768.medium.jpg/1551045302558.jpg",
    link: "https://womeninengineering.auckland.ac.nz/", // Internal link
  },
  {
    title: "Engineering at UoA",
    description:
      "This four-year programme ensures you’re career-ready upon graduation. Explore the 10 specialisations.",
    image:
      "https://www.auckland.ac.nz/content/auckland/en/engineering/study-with-us/study-options/undergraduate-study-at-the-faculty-of-engineering0/jcr:content/par/linkspagetemplategri_763583401/par2/subflexicomponentlin/image.img.768.medium.jpg/1716425560576.jpg",
    link: "https://www.auckland.ac.nz/en/study/study-options/find-a-study-option/bachelor-of-engineering-honours-behons.html", // Internal link
  },
  {
    title: "Highschool Requirements",
    description:
      "Find out the secondary school entry requirements to do UoA's Engineering Programme.",
    image:
      "https://www.auckland.ac.nz/content/auckland/en/engineering/study-with-us/study-options/undergraduate-study-at-the-faculty-of-engineering0/jcr:content/par/linkspagetemplategri_763583401/par2/subflexicomponentlin/image.img.768.medium.jpg/1716425560576.jpg",
    link: "/highschool-requirements", // External link
  },
  // Add more card data as needed
];

const CardSection: React.FC = () => {
  return (
    <Box
      sx={{
        padding: "2em",
        color: "#00467F",
      }}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Additional Resources
      </Typography>
      <Grid
        container
        marginTop={"0.8em"}
        alignItems={"center"}
        spacing={4}
        justifyContent="center"
      >
        {cardsData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            display="flex" // Makes the item a flex container
            justifyContent="center" // Centers the card inside the grid item
          >
            <HomePageCard
              title={card.title}
              description={card.description}
              image={card.image}
              link={card.link} // Pass the link
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardSection;
