import Whitelist from '../models/whitelistModel.js';

// create whitelisted email
const addEmail = async (req, res) => {
    const {email} = req.body

    try {
        const whitelist = await Whitelist.add(email)
        res.status(200).json({email})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// remove a Email
const removeEmail = async (req, res) => {
    const {email} = req.body

    try {
        const whitelist = await Whitelist.remove(email)
        res.status(200).json({email})
    } catch (error) {
    res.status(400).json({error: error.message})
    }
} 


export { addEmail, removeEmail };