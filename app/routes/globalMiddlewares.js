"use strict";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

export default (app) => {
  if (process.env.NODE_ENV === "production") {
    app.use(compression());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.raw());
  app.use(cors());
};
