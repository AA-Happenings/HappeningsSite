import express from "express";
import { addEmail, removeEmail, getEmails} from '../controllers/whitelistController.js'

const router = express.Router()

router.post('/add', addEmail)

router.delete('/remove', removeEmail)

router.get('/', getEmails)

//module.exports = router
export default router;
