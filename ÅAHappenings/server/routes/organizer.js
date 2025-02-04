//const express = require('express')
import express from "express";


import {loginOrganizer, signupOrganizer} from '../controllers/organizerController.js'

const router = express.Router()

router.post('/login', loginOrganizer)

router.post('/signup', signupOrganizer)

//module.exports = router
export default router;
