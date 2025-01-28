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
        type: Schema.Types.ObjectId,
        ref: 'Test'
        
    }],
    access:
    {
        type: Boolean,
        enum: [true, false],
        default : true
    }, 
    graduationBatch:
    {
        type: Schema.Types.ObjectId,
        ref: 'Graduate'
    }
})

export const Enrollment = mongoose.models?.Enrollment || mongoose.model('Enrollment', enrollmentSchema)