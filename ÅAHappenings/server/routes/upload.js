import express from "express"
import upload from "../middleware/upload.js"
import Image from "../models/imageModel.js"
import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router();
router.use(requireAuth);
// Single File Upload
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.name}`;
  const image = new Image({ imageUrl });

  try {
    await image.save();
    res.json({ imageUrl, message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving image" });
  }
});

export default router;