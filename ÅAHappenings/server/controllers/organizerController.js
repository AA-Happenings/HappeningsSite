//const Organizer = require('../models/organizerModel')
//const jwt = require('jsonwebtoken')

import Organizer from '../models/organizerModel.js';
import jwt from 'jsonwebtoken';


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn : '3d'})
}


// login organizer
const loginOrganizer = async (req, res) => {
    const {email, password} = req.body

    try {
        const organizer = await Organizer.login(email, password)

        // create jwt token
        const token = createToken(organizer._id)

        res.status(200).json({email, username: organizer.username, _id: organizer._id , color: organizer.color ,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup a organizer
const signupOrganizer = async (req, res) => {
    const {email, username, password, admin} = req.body

    try {
        const organizer = await Organizer.signup(email, username, password, admin)

        // create jwt token
        const token = createToken(organizer._id)

        res.status(200).json({email, username: organizer.username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOrganizers = async (req, res) => {
    const organizers = await Organizer.find({})
    res.status(200).json(organizers)
    
}

const getColor = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.user.id);
        if (!organizer) return res.status(404).json({ error: 'Organizer not found' });

        res.json({ color: organizer.color });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update the color of the authenticated organizer
const updateColor = async (req, res) => {
    try {
        const { color } = req.body;
        const organizer = await Organizer.findById(req.user.id);
        if (!organizer) return res.status(404).json({ error: 'Organizer not found' });

        organizer.color = color;
        await organizer.save();

        res.json({ message: 'Color updated', color: organizer.color });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateOrganizer = async (req, res) => {
    const { id } = req.params;
  
    // Check if the provided id is a valid ObjectId.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such organizer' });
    }
  
    // Ensure that the logged-in organizer is updating their own profile.
    if (req.user._id !== id) {
      return res.status(401).json({ error: 'Not authorized to update this organizer' });
    }
  
    // Verify that the organizer exists.
    const organizer = await Organizer.findById(id);
    if (!organizer) {
      return res.status(400).json({ error: 'No such organizer' });
    }
  
    // Update the organizer with the fields in req.body.
    // For example, updating description, linkToWebsite, color, profilePic, etc.
    const updatedOrganizer = await Organizer.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
  
    res.status(200).json(updatedOrganizer);
  };
  

//module.exports = {signupOrganizer, loginOrganizer}
export { signupOrganizer, loginOrganizer, getOrganizers,  getColor, updateColor, updateOrganizer };