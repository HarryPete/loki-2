import mongoose from "mongoose";
import { Schema } from "mongoose";

const triggerSchema = new Schema({
    id:
    {
        type: Number,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    triggerId:
    {
        type: String,
        required: true
    },
    type: 
    {
        type: String,
        required: true
    },
    course:
    {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
},{ timestamps: true })

export const Trigger = mongoose.models?.Trigger || mongoose.model('Trigger', triggerSchema);
