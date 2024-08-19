import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    <>
      <p>{data?.title}</p>
    </>
  );
}

export default App;
