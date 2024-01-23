import { FRONTEND_URI, NODE_ENV } from "@/config/config";
import { __limit, __prefix_api_version } from "@/constants/express";
import { errorHandler } from "@/middlewares/error/error-handler.middleware";
import { errorLogger } from "@/middlewares/error/error-logger.middleware";
import { routeNotFound } from "@/middlewares/error/route-not-found.middleware";
import appHealthRouter from "@/routes/app-health.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";

export const app: Application = express();

// using pre-built middlewares
app.use(
  cors({
    origin: [FRONTEND_URI],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  }),
  cookieParser(),
  express.json({
    limit: __limit,
  }),
  express.urlencoded({ extended: true, limit: __limit }),
  express.static("public")
);

// logs requests in development mode
if (NODE_ENV === "development") app.use(morgan("combined"));

// using routes
// app.use(`${__prefix_api_version}/users`, verifyAuthentication, usersRouter);

// app health route
app.use(`${__prefix_api_version}`, appHealthRouter);

// error handler middlewares
app.use(errorLogger, errorHandler, routeNotFound);
