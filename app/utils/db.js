import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export let db = null;
const connect = async () => {
  try {
    await client.connect();
    db = client.db();
  } catch (err) {
    console.log(err);
  }
};

export default connect;
