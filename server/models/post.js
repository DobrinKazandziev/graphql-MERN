import { nanoid } from 'nanoid'
import mongoose, { ObjectId } from 'mongoose';
// const { ObjectId } = mongoose.Types;

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'Content is required',
  },
  image: {
    url: {
      type: String,
      default: 'https://via.placeholder.com/200x200.png?text=Post',
    },
    public_id: {
      type: String,
      default: Date.now(),
    }
  },
  postedBy: {
    type: mongoose.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
