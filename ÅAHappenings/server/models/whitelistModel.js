//const mongoose = require('mongoose');
import mongoose from 'mongoose'

const whitelistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//module.exports = mongoose.model('Whitelist', whitelistSchema);
const Whitelist = mongoose.model('Whitelist', whitelistSchema);
export default Whitelist;