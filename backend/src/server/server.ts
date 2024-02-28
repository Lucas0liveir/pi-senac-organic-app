import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../config/db.connection";
import routes from "../routes";
import { errorMiddleware } from "../middleware/error.handler";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

export { app };
