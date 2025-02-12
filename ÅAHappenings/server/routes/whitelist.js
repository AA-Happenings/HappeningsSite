import express from "express";
import { addEmail, removeEmail} from '../controllers/whitelistController.js'

const router = express.Router()

router.post('/add', addEmail)

router.delete('/remove', removeEmail)

//module.exports = router
export default router;
