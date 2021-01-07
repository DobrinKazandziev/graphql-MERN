import { nanoid } from 'nanoid'
import mongoose, { ObjectId } from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: true,
    unique: true,
    default: () => nanoid(),
  },
  fullName: {
    type: String,
    default: () => nanoid(),
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  images: {
    type: Array,
    default: [
      {
        url: 'https://via.placeholder.com/200x200.png?text=Profile',
        public_id: Date.now(),
      }
    ]
  },
  about: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
