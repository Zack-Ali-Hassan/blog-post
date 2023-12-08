import path from 'path';
import express from "express";
import chalk from "chalk";
import { port } from "./config/config.js";
import userRouter from "./routers/userRouters.js";
import postRouter from "./routers/postRouters.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { customError } from "./midlewares/customError.js";

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
var whiteList = ["http://localhost:5000", "http://localhost:5173"];
var corOptionDelegate = function (req, callback) {
  var corOption;
  if (whiteList.indexOf(req.header("origin")) !== -1) {
    corOption = { origin: true };
  } else {
    corOption = { origin: false };
  }
  callback(null, corOption);
};
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/posts/", postRouter);
var rateLimitApi = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Rate limit exceeded",
});
app.use(rateLimitApi);

if(process.env.NODE_ENV == 'production'){
  const _dirname = path.resolve();
  app.use(express.static(path.join(_dirname, '/frontend/dist')));
  app.get('*' , (req, res)=>{
    res.sendFile(path.resolve(_dirname,'frontend', 'dist', 'index.html'));
  })
}
else{
  app.get('/api' , (req, res)=>{
    res.send("api is runing...");
  })
}

app.use((req, res, next) => {
  next(
    customError(
      404,
      req.originalUrl + " This page does not found, please try again..😵😵"
    )
  );
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server errro....";
  res.status(status).send(message);
});

connectDb();

// const ports = port || 4000;
const ports = 5000;
app.listen(ports, () => {
  console.log(
    `${chalk.green.bold("Server")} is running on port ${chalk.red.bold(
      "http://localhost:"
    )}${ports}`
  );
});
