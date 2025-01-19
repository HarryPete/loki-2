import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    batch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    },
    mocks:
    [{
        mock:
        {
            type: Schema.Types.ObjectId,
            ref: 'Test'
        },
        status:
        {
            type: String,
            enum: ['Pending', 'Completed'],
            default : 'Pending'
        }
    }],
    access:
    {
        type: Boolean,
        enum: [true, false],
        default : true
    }
})

export const Enrollment = mongoose.models?.Enrollment || mongoose.model('Enrollment', enrollmentSchema)