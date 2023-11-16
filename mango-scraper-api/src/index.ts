import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/routes";

dotenv.config();

const app: Express = express();
const jsonParser = bodyParser.json();
const port = process.env.PORT;

app.use(jsonParser);
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
