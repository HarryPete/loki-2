import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
    {
        title: 
        { 
            type: String
        },
        course:
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        mocks:
        [{
            mock: 
            {
                type: Schema.Types.ObjectId,
                ref: 'Quiz'
            },
            results:
            [{
                test:
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Test'
                },
                user:
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }],
            status:
            {
                type: String,
                enum: ['Locked', 'Unlocked'],
                default : 'Locked'
            },
        }],
        enrollments:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Enrollment'
        }],
        status:
        {
            type: String,
            enum: ['Upcoming', 'Ongoing', 'Completed'],
            default : 'Upcoming'
        },
        access:
        {
            type: String,
            enum: [true, false],
            default : true
        },
        sessions:
        [{
            type: Schema.Types.ObjectId,
            ref: 'Session'
        }],
        mentor: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        zoomLink:
        {
            type: String,
        },
        whatsappLink:
        {
            type: String,
        },
        startDate:
        {
            type: Date
        },
        endDate:
        {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

export const Batch = mongoose.models?.Batch || mongoose.model('Batch', batchSchema) 