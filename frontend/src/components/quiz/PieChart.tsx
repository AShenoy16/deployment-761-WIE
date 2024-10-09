import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, useMediaQuery, useTheme } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  data: { name: string; score: number }[];
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Overall Score",
        data: data.map((item) => item.score.toFixed(2)),
        backgroundColor: ["#4F2D7F", "#00467F", "#95F9E3"],
      },
    ],
  };

  return (
    <Box width={isSmallScreen ? "95%" : "70%"} margin="auto" mb={1}>
      <Pie data={chartData} />
    </Box>
  );
};

export default PieChart;
