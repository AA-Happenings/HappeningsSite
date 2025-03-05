import express from "express";
import {loginOrganizer, signupOrganizer, getOrganizers, getColor, updateColor, updateOrganizer, getOrganizerById} from '../controllers/organizerController.js'
import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router()

router.post('/login', loginOrganizer)

router.post('/signup', signupOrganizer)

router.get('/', getOrganizers)

router.get('/:id', getOrganizerById);

router.get('/color', getColor);

router.patch('/update/:id', requireAuth ,updateOrganizer)

// Update organizer color
router.put('/color', updateColor);

//module.exports = router
export default router;
