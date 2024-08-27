import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme";
import QuizPage from "./pages/QuizPage";

function App() {
  const fetchPost = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
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
      {/* <Box color="#FFF" sx={{ backgroundColor: "primary.main" }}>
        <p>{data?.title}</p>
      </Box> */}
      <QuizPage />
    </ThemeProvider>
  );
}

export default App;
