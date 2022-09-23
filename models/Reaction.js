const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: [true, "Reaction body is required"],
            maxLength: 280
        },
        username: {
            type: String,
            required: [true, "username is required"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toLocaleDateString();
            },
        }
    }
)