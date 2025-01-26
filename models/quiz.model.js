import mongoose, {Schema} from "mongoose";

const quizSchema = new Schema({
    id:
    {
        type: Number,
        required: true
    },
    title:
    {
        type: String
    },
    course:
    {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    reference:
    {
        type: [Schema.Types.Mixed]
    }
},{timestamps: true})

export const Quiz = mongoose.models?.Quiz || mongoose.model('Quiz', quizSchema)