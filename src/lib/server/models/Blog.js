import mongoose from 'mongoose';
import User from './User';

const BlogSchema = new mongoose.Schema({
    name: String,
    content: String,
    images: [String],
    author: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);