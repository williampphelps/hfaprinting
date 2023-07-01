import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    emailVerified: Boolean,
    stripe_account: String,
    type: String
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

export default mongoose.models.User || mongoose.model('User', UserSchema);