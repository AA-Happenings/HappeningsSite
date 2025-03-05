import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    how: {
        type: String,
    },
    price: {
        type: String,
    },
    link: {
        type: String,
    },
    membersOnly: {
        type: String,
    },
    tags: {
        type: [String],
    },
    ao: {
        type: [String],
    },
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("Event", eventSchema)