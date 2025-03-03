import express from 'express'

import {
  getEvents,
  getEvent,
  getMyEvents,
  createEvent,
  deleteEvent,
  updateEvent
} from '../controllers/eventController.js'

import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router()

//get all workouts
router.get('/', getEvents)

//get all events for logged in organizer
router.get('/', getMyEvents)

//get a single event
router.get('/:id', getEvent)

//post a new event
router.post('/', requireAuth, createEvent)

//delete an event
router.delete('/:id', requireAuth ,deleteEvent)

//update an event
router.patch('/:id', requireAuth, updateEvent)

export default router;

/*
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
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        how: req.body.how,
        price: req.body.price,
        link: req.body.link,
        membersOnly: req.body.membersOnly,
        tags: req.body.tags,
      };
      let collection = await db.collection("events");
      let result = await collection.insertOne(newDocument);
      res.send(result).status(204);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        how: req.body.how,
        price: req.body.price,
        link: req.body.link,
        membersOnly: req.body.membersOnly,
        tags: req.body.tags
      },
    };

    let collection = await db.collection("events");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("events");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
*/