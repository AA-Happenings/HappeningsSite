import express from "express";
import {loginOrganizer, signupOrganizer, getOrganizers} from '../controllers/organizerController.js'

const router = express.Router()

router.post('/login', loginOrganizer)

router.post('/signup', signupOrganizer)

router.get('/', getOrganizers)

//module.exports = router
export default router;
