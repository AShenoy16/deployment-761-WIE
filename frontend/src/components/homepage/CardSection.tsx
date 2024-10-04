import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
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
  const stackRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if the content overflows the container
  useEffect(() => {
    const checkOverflow = () => {
      if (stackRef.current) {
        setIsOverflowing(
          stackRef.current.scrollWidth > stackRef.current.clientWidth
        );
      }
    };

    // Check on mount and when the window resizes
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [resources]);

  return (
    <Box
      sx={{
        padding: "2em",
        color: "#00467F",
        width: "100%", // Ensure it takes full width of container
      }}
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
      <Stack
        role="list"
        ref={stackRef}
        p="1.25rem"
        direction="row"
        gap={4}
        overflow="auto"
        justifyContent={isOverflowing ? "flex-start" : "center"} // Center if no overflow
        sx={{
          scrollBehavior: "smooth",
          "@media (pointer: coarse)": {
            scrollSnapType: "x mandatory", // Enable scroll snapping for touch devices
            "& > *": {
              scrollSnapAlign: "center",
              scrollSnapStop: "always",
            },
          },
        }}
      >
        {resources.map((card, index) => (
          <Box key={index} flexShrink={0}>
            <HomePageCard
              title={card.title}
              description={card.description}
              image={card.image}
              link={card.link}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CardSection;
