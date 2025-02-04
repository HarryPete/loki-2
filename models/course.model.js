import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    id:
    {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    offerPrice:
    {
        type: Number,
        required: true
    },
    imageURL:
    {
        type: String,
        required: true
    },
    batches: 
    [{
        type: Schema.Types.ObjectId,
        ref: 'Batch'
    }],
    lectures:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    feedbacks:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    mocks:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    simulations:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Trigger'  
    }]
},{timestamps: true})

export const Course = mongoose.models?.Course || mongoose.model('Course', courseSchema);; 