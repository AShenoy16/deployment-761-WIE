import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

// Define types for the animations
interface AnimatedContainerProps {
  children: React.ReactNode; // The content to be wrapped by the animation
  delay?: number; // Optional delay for the animation
  animationType?: "slideLeft" | "slideUp" | "zoomIn" | "fade"; // Choose from predefined animations
  customAnimation?: {
    initial?: object;
    animate?: object;
    transition?: object;
  }; // Optional custom animation object
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
  animationType = "slideLeft", // Default to slideLeft
  customAnimation,
}) => {
  // Hook to determine if the component is in view
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Predefined animations
  const animations = {
    slideLeft: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay },
    },
    slideUp: {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay },
    },
  };

  // Use custom animation if provided, otherwise default to predefined animations
  const chosenAnimation = customAnimation || animations[animationType];

  return (
    <motion.div
      ref={ref}
      initial={chosenAnimation.initial}
      animate={inView ? chosenAnimation.animate : {}}
      transition={chosenAnimation.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
