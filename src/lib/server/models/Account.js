import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    userId: mongoose.ObjectId,
    type: String,
    token_type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_in: Number,
    scope: String,
    id_token: String,
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);