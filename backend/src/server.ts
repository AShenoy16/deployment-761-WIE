import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT ?? 5001;

const startServer = async () => {
  try {
    // Establish database connection
    await connectDB();
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

startServer();
