import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { limiter } from "./middleware/rate-limit";
import { logger } from "./utils";
import { invalidRoute, errorMiddleware } from "./middleware/errorHandler";

import cardRouter from "./routers/card.router";
import router from "./routers/health";

const app = express();
const port = Number(process.env.PORT) || 3200;

app.use(router);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);

app.use(helmet());
app.use(morgan("tiny"));
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", cardRouter);

app.use(invalidRoute);
app.use(errorMiddleware);

const server = app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

process.on("SIGTERM", () => {
  logger.debug(`Received SIGTERM signal: closing HTTP server`);
  server.close(() => {
    logger.info("HTTP server closed");
  });
});
