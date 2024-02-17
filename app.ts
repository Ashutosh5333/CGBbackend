import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes";


const app: Application = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome Home");
});

app.use("/user", userRouter);

export default app;
