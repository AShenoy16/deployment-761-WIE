import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { usePlaceholderStore } from "./stores/placeholderStore";
import { Box, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";

// Some random placeholder code to check if installed libararies are working
function App() {
  const thing = usePlaceholderStore((state) => state.thing);
  const setThing = usePlaceholderStore((state) => state.setThing);

  const fetchPost = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    setThing("thing");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPost,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <ThemeProvider theme={lightTheme}>
      <Box color="#FFF" sx={{ backgroundColor: "primary.main" }}>
        <p>{data?.title}</p>
        <p>{thing}</p>
      </Box>
    </ThemeProvider>
  );
}

export default App;
