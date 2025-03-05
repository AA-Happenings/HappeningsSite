//const Organizer = require('../models/organizerModel')
//const jwt = require('jsonwebtoken')

import Organizer from '../models/organizerModel.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


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

const getOrganizerById = async (req, res) => {
    const { id } = req.params;

    // Check if the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid organizer ID' });
    }

    try {
        const organizer = await Organizer.findById(id);

        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }

        res.status(200).json(organizer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


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
    console.log(id)


    console.log("Received ID from params:", id); // Debugging

    if (!id) {
        return res.status(400).json({ error: 'Missing organizer ID in request' });
    }
    // Check if the provided id is a valid ObjectId.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid organizer ID' });
    }

    // Ensure user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized request' });
    }

    // Ensure the logged-in user is updating their own profile.
    if (req.user._id.toString() !== id) {
        return res.status(403).json({ error: 'Not authorized to update this organizer' });
    }

    try {
        // Verify the organizer exists.
        const organizer = await Organizer.findById(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }

        // Update organizer's details
        const updatedOrganizer = await Organizer.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updatedOrganizer);
    } catch (error) {
        console.error("Error updating organizer:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

  

//module.exports = {signupOrganizer, loginOrganizer}
export { signupOrganizer, loginOrganizer, getOrganizers,  getColor, updateColor, updateOrganizer , getOrganizerById};