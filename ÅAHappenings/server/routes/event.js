import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//get all events
router.get("/", async (req, res) => {
    let collection = await db.collection("events");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

//get event by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("events");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//create new event
router.post("/", async (req, res) => {
    try {
      let newDocument = {
        title: req.body.title,
        place: req.body.place,
        date: req.body.date,
      };
      let collection = await db.collection("events");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
  });

  export default router;