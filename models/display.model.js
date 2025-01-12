import mongoose, { Schema } from "mongoose";

const displaySchema = new Schema(
    {
        feedbacks:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }],
        recentGraduates:
        [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        recentJobs:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }]
    },
    {
        timestamps: true
    }
)

export const Display = mongoose.models?.Display || mongoose.model('Display', displaySchema) 