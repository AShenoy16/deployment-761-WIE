import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import HomePageCard from "./HomePageCard";

interface Card {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface CardSectionProps {
  resources: Card[];
}

const CardSection: React.FC<CardSectionProps> = ({ resources }) => {
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
        {resources.map((card, index) => (
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
