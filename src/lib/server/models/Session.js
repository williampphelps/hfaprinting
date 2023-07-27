import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    userId: mongoose.ObjectId,
    sessionToken: String,
    expires: Date,
});

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);