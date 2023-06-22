import mongoose from 'mongoose';

const BoxSchema = new mongoose.Schema({
    width: Number,
    length: Number,
    height: Number,
    weight: Number,
    package: { type: mongoose.ObjectId, ref: 'Parcels' }
})

const OptionsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    images: [String],
    box: BoxSchema
})

const VariantSchema = new mongoose.Schema({
    name: String,
    price: Number,
    images: [String],
    options: [OptionsSchema],
    optionLabel: String,
    optionsEnabled: Boolean,
    box: BoxSchema
})

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [String],
    variants: [VariantSchema],
    variantLabel: String,
    variantsEnabled: Boolean,
    donationEnabled: Boolean,
    donationPrompt: String,
    store: { type: mongoose.ObjectId, ref: 'Users'},
    box: BoxSchema,
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);