import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";

const jobSchema = new Schema(
    {
        title: 
        { 
            type: String,
            required: true
        },
        company:
        {
            type: String,
            required:  true
        },
        workplaceType:
        {
            enum: ['On-site', 'Hybrid', 'Remote'],
            default: 'Onsite'
        },
        location:
        {
            type: String,
            required: true
        },
        jobType:
        {
            type: String,
            required: true   
        },
        skills:
        [{
            type: String
        }],
        description:
        {
            type: String,
            required: true
        },
        experience:
        {
            type: Number,
            required: true
        },
        openings:
        {
            type: Number,
            default: 1
        }, 
        postedBy:
        {
            type: mongoose.Types.ObjectId,
            ref: User
        },
        budget: Number,
        link: String
    },
    {
        timestamps: true
    }
)

export const Job = mongoose.models?.Job || mongoose.model('Job', jobSchema) 