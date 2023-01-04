import * as dotenv from "dotenv";
import http from "http";
import app from "./app";
import mongoose from "mongoose";
dotenv.config();
const uri = process.env.MONGO_URI;
const port = process.env.PORT;

if (!uri) {
  throw new Error("Missing MONGO_URI environment variable.");
}

if (!port) {
  throw new Error("Missing PORT environment variable.")
}

mongoose.set('strictQuery', false)

mongoose
  .connect(uri)
  .then(() => console.log(`>> Connected successfully to MongoDB 😊`))
  .catch((err) => console.log(`<< Connection to mongo failed 😢\n${err}`));

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`>> Server beautifully started on port ${port} 🚀`);
});
