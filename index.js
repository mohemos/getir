import express from "express";
import startDB from "./app/utils/db";
import routes from "./app/routes";
import globalMiddlewares from "./app/routes/globalMiddlewares";

const app = express();
const PORT = process.env.PORT;

globalMiddlewares(app);
routes(app);

startDB()
  .then(() => console.log(`=====MongoDB connection established=====`))
  .catch((err) => console.log(err));

app.listen(PORT, (err) => {
  if (err) console.log(`An error occured while started App on ${PORT}`);
  else console.log(`==== Connection established on PORT: ${PORT} =====`);
});
