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
            required: true
        },
        workplaceType:
        {
            type: String,
            required: true
        },
        jobType:
        {
            type: String,
            required: true  
        },
        country:
        {
            type: String,
            required: true
        },
        city:
        {
            type: String,
            required: true
        },
        skills:
        [{
            type: String
        }],
        experience:
        {
            type: String,
            required: true
        },
        budget: Number,
        openings:
        {
            type: String,
            required: true
        }, 
        link: String,
        description:
        {
            type: String,
            required: true
        },
        interests:
        [{
            type: mongoose.Types.ObjectId,
            ref: User
        }],
        postedBy:
        {
            type: mongoose.Types.ObjectId,
            ref: User
        },
        email:
        {
            type: String,
            required: true
        },
        contact: String
    },
    {
        timestamps: true
    }
)

export const Job = mongoose.models?.Job || mongoose.model('Job', jobSchema) 