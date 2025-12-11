import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import keyValueRouter from "./src/routes/keyValue";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/keyValue", keyValueRouter);

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to In-Memory DB of key/values");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
