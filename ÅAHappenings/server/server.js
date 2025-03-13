import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import events from "./routes/event.js";
import organizer from "./routes/organizer.js";
import whitelist from "./routes/whitelist.js";
import upload from "./routes/upload.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/event", events);
app.use("/organizer", organizer)
app.use("/whitelist", whitelist)
app.use("/uploads", upload)

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

/*
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
*/