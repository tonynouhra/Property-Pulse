import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already in use'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already in use'],
    },
    image: {
        type: String,
        default: ''
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const User = models.User || model('User', userSchema); // Check if the model already exists to avoid OverwriteModelError

export default User;