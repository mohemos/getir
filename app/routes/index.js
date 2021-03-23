import { errorMessage } from "../utils";
import Record from "../modules/record";

export default (app) => {
  app.use("/", Record);

  app.use((err, req, res, next) => {
    if (!err) return next();
    res.status(err.httpStatusCode || 500).json(errorMessage(err));
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `Requested route ( ${req.get("HOST")}${
        req.originalUrl
      } ) not found`,
    });
  });
};
