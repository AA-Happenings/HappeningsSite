
import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true 
},
  uploadedAt: {
    type: Date,
    default: Date.now
},
});

export default mongoose.model("Image", ImageSchema);
