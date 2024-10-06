import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";

// AnimatedCard Component
interface AnimatedCardProps {
  children: React.ReactNode; // The content to be wrapped by the animation
  delay?: number; // Optional delay for the animation
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  // Hook to determine if the component is in view
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }} // Initial state: fully transparent and off-screen to the left
      animate={inView ? { opacity: 1, x: 0 } : {}} // Animate to fully visible and original position when in view
      transition={{ duration: 0.6, delay }} // Animation duration and delay
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
