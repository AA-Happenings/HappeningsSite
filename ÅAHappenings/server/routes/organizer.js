import express from "express";
import {loginOrganizer, signupOrganizer, getOrganizers, getColor, updateColor, updateOrganizer} from '../controllers/organizerController.js'

const router = express.Router()

router.post('/login', loginOrganizer)

router.post('/signup', signupOrganizer)

router.get('/', getOrganizers)

router.get('/color', getColor);

router.patch('/update', updateOrganizer)

// Update organizer color
router.put('/color', updateColor);

//module.exports = router
export default router;
