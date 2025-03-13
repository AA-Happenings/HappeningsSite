import Event from '../models/eventModel.js'
import mongoose from 'mongoose'

//get all events
const getEvents = async (req, res) => {
    const events = await Event.find()

    res.status(200).json(events)
}

//get events for a user
const getMyEvents = async  (req, res) => {
    const user_id = req.user._id

    const events = await Event.find({user_id})

    res.status(200).json(events)
}

//get event by id
const getEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
      }
    
      const event = await Event.findById(id)
    
      if (!event) {
        return res.status(404).json({error: 'No such event'})
      }
      
      res.status(200).json(event)
}

//create new event
const createEvent = async (req, res) => {
    const {title, description, location, date, time, how, price, link, membersOnly, tags, ao} = req.body
  
    let emptyFields = []
  
    if(!title) {
      emptyFields.push('title')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all mandatory fields', emptyFields })
    }
  
    // add doc to db
    try {
      const user_id = req.user._id
      const username = req.user.username
      const event = await Event.create({title, description, location, date, time, how, price, link, membersOnly, tags, ao, user_id, username})
      res.status(200).json(event)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

//delete event
const deleteEvent = async (req, res) => {
    const { id } = req.params
    const user_id = req.user._id
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})

    }

    const event = await Event.findById(id)

    if (!event) {
      return res.status(400).json({error: 'No such event'})
  }

    if (!req.user.admin && event.user_id != user_id){
      return res.status(401).json({error: 'not authorized for this event'})
    }

    await Event.findOneAndDelete({_id: id})
    
    
    
    res.status(200).json(event)
}

//update event
const updateEvent = async (req, res) => {
    const { id } = req.params
    const user_id = req.user._id
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such event'})
    }
    
    const event = await Event.findById(id)
    if (event.user_id != user_id){
      return res.status(401).json({error: 'not authorized for this event'})
    }

    await Event.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!event) {
      return res.status(400).json({error: 'No such event'})
    }
  
    res.status(200).json(event)
}


export {
    getEvents,
    getEvent,
    getMyEvents,
    createEvent,
    deleteEvent,
    updateEvent,
}
