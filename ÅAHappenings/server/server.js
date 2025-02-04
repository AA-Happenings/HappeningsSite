import express from "express";
import cors from "cors";
import events from "./routes/event.js";
import organizer from "./routes/organizer.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/event", events);
app.use("/organizer", organizer)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
