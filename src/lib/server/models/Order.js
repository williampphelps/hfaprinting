import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    payment_intent: String,
    donationAmount: Number,
    cart: [{}],
    shipping: {
        address_from: {},
        address_to: {},
        parcels: [{
            width: Number,
            height: Number,
            length: Number,
            weight: Number
        }]
    },
    shippingMethod: {}
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);