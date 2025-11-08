import {Schema, model, models} from 'mongoose';

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId, ref: 'User', required: false
    },
    name: {
        type: String, required: true,
    },
    type: {
        type: String, required: true,
    },
    description: {
        type: String,
    },
    location: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    beds: {
        type: Number, required: true,
    },
    baths: {
        type: Number, required: true,
    },
    square_feet: {
        type: Number, required: true,
    },
    amenities: {
        type: [String], // Array of strings
    },
    images: {
        type: [String],
    },
    rates: {
        nightly: {type: Number, default: null},
        weekly: {type: Number, default: null},
        monthly: {type: Number, default: null},
    },
    seller_info: {
        name: {type: String},
        email: {type: String},
        phone: {type: String},
    },
    is_featured: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

export default models.Property || model('Property', PropertySchema); // Check if the model already exists to avoid OverwriteModelError