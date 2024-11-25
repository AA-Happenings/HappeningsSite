import { MongoClient} from "mongodb";

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("happenings").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("happenings");

export default db;