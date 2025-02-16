//const mongoose = require('mongoose');
import mongoose from 'mongoose'
import validator from 'validator';


const Schema = mongoose.Schema

const whitelistSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
},
{timestamps: true}
);


whitelistSchema.statics.add = async function(email){
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    const emailExists = await this.findOne({ email });

    if (emailExists){
        throw Error ('Email already in use')
    }

    const whitelist = await this.create({email})

    return whitelist
}


whitelistSchema.statics.remove = async function(email){
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    const emailExists = await this.findOne({ email });

    if (!emailExists){
        throw Error ('Email is not found in whitelist')
    }

    const whitelist = await this.deleteOne({email})

    return whitelist
}




const Whitelist = mongoose.model('Whitelist', whitelistSchema);
export default Whitelist;