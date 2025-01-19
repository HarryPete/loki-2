import mongoose, {Schema} from "mongoose";

const testSchema = new Schema({
    title:
    {
        type: String
    },
    questions:
    {
        type: [Schema.Types.Mixed]
    },
    answers:
    {
        type: [[Number]]
    },
    status:
    {
        type : String,
        enum : ['Pending', 'Completed'],
        default: 'Pending'
    },
    score: Number,
    takes: Number
},{timestamps: true})

export const Test = mongoose.models?.Test || mongoose.model('Test', testSchema)