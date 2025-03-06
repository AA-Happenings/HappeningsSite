import express from "express"
import upload from "../middleware/upload"
const router = express.Router();

// Single File Upload
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  const image = new Image({ imageUrl });

  try {
    await image.save();
    res.json({ imageUrl, message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving image" });
  }
});

export default router;