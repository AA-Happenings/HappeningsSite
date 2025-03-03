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

        res.status(200).json({email, token})
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

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOrganizers = async (req, res) => {
    const organizers = await Organizer.find({})
    res.status(200).json(organizers)
    
}

//module.exports = {signupOrganizer, loginOrganizer}
export { signupOrganizer, loginOrganizer, getOrganizers };