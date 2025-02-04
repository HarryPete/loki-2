import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
    id: 
    {
        type: Number,
        required: true
    },
    lecture:
    {
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
    },
    isCompleted:
    {
        type : Boolean,
        enum : [true, false],
        default: false
    }
},
{
    timestamps : true
})

export const Session = mongoose.models?.Session || mongoose.model('Session', sessionSchema);

