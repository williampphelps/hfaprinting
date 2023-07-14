import mongoose from 'mongoose';
import User from './User';

const ShopSchema = new mongoose.Schema({
    name: String,
    description: String,
    logo: String,
    admin: mongoose.ObjectId,
    collaborators: [mongoose.ObjectId],
    stripe_account: String,
    slug: String
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

export default mongoose.models.Shop || mongoose.model('Shop', ShopSchema);