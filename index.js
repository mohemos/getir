import express from "express";
import db from "./app/utils/db";
import routes from "./app/routes";
import globalMiddlewares from "./app/routes/globalMiddlewares";

const app = express();
globalMiddlewares(app);
routes(app);

const PORT = process.env.PORT;

db()
  .then(() => console.log(`=====MongoDB connection established=====`))
  .catch((err) => console.log(err));

app.listen(PORT, (err) => {
  if (err) console.log(`An error occured while started App on ${PORT}`);
  else console.log(`==== Connection established on PORT: ${PORT} =====`);
});
