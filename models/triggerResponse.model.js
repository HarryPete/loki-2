import mongoose, { Schema } from "mongoose";

const triggerResponseSchema = new Schema({
    trigger:
    {
        type: Schema.Types.ObjectId,
        ref: 'Trigger'
    },
    response: String,
    batch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    enrollment:
    {
        type: Schema.Types.ObjectId,
        ref: 'Enrollment'
    },
    isCompleted: 
    {
        type: Boolean,
        enum: [true, false],
        default: false
    }
},{ timestamps: true})

export const TriggerResponse = mongoose.models?.TriggerResponse || mongoose.model('TriggerResponse', triggerResponseSchema);