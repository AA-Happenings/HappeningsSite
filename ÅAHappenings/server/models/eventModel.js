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
        type: Date,
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
        type: Boolean,
    },
    tags: {
        type: [String],
    }
})

export default mongoose.model("Event", eventSchema)