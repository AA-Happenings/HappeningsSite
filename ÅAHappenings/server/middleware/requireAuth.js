import jwt from 'jsonwebtoken';
import User from '../models/organizerModel.js'

const requireAuth = async (req, res, next) => {

    // verify auth
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'auth token required'})
    }

    // gets the token part of the authorization
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id isAdmin')
        next()

    } catch ( error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorized'})
    }

};

const requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'access denied, admin only'});
    }
    next()
}

export { requireAuth, requireAdmin };