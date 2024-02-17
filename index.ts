import { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { connection as Coonectdatabase } from "./config/db.connect";

dotenv.config({ path: "config/config.env" });

const port: number = parseInt(process.env.PORT as string, 10) || 8000;

process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

const server: Server = app.listen(port, async () => {
  await Coonectdatabase();
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
