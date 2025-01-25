import mongoose, {Schema} from "mongoose";

const testSchema = new Schema({
    quiz:
    {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    answers:
    {
        type: [Schema.Types.Mixed]
    },
    enrollment:
    {
        type: Schema.Types.ObjectId,
        ref: 'Enrollment'
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