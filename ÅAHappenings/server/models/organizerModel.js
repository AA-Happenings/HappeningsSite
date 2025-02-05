/*const  mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Whitelist = require('./whitelistModel')
*/

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import Whitelist from './whitelistModel.js';


const Schema = mongoose.Schema

const organizerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

organizerSchema.static.signup = async function(email, username, password){
    
    // validation for signup

    if (!email || !password || !username){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })
    const isWhitelisted = await Whitelist.findOne({ email });

    if (!isWhitelisted){
        throw Error('Email is not allowed for signup')
    }
    if (emailExists){
        throw Error ('Email already in use')
    }
    if (usernameExists){
        throw Error ('Username already in use')
    }

    // salt and hash passwords
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const organizer = await this.create({ email, username, password : hash})

    return organizer 
}

// static login method
organizerSchema.static.login = async function(email, password){
    
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user){
        throw Error ('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user

}

const Organizer = mongoose.model('Organizer', organizerSchema)
export default Organizer;