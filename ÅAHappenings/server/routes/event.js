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

//get all events
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