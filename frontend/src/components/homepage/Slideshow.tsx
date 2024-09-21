/** @jsxImportSource @emotion/react */
import React from "react";
import { Typography, Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { css } from "@emotion/react";

interface Slide {
  name: string;
  imageURL: string;
}

interface SlideshowProps {
  slides: Slide[];
}

const customCarouselStyle = css`
  .carousel .control-dots .dot {
    background-color: #00467f; /* Blue color for inactive dots */
  }

  .carousel .control-dots .dot.active {
    background-color: #00467f; /* Lighter blue color for the active dot */
  }
`;

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <Carousel
        css={customCarouselStyle} // Apply the custom styles
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={3500}
        emulateTouch
        stopOnHover
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              textAlign: "center",
              mb: "2em", // Add margin-bottom to prevent overlap
              height: { xs: 200, sm: 250 }, // Set a fixed height for the container
              overflow: "hidden", // Hide overflow to prevent any extra image parts from showing
            }}
          >
            <img
              src={slide.imageURL}
              alt={slide.name}
              style={{
                width: "100%",
                height: "100%", // Forces the image to take up the full height of the container
                objectFit: "cover", // Ensures the image covers the container while maintaining aspect ratio
                display: "block", // Ensure image displays properly
              }}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent background
                color: "white", // Optional: Set text color to improve readability
                margin: 0,
                padding: "0.2em", // Adjust padding as needed
              }}
            >
              {slide.name}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slideshow;
