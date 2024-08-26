import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Establish database connection
    await connectDB();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

startServer();
